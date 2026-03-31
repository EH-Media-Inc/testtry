from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import aiohttp


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Social Hub API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    hubspot_contact_id: Optional[str] = None
    created_at: str
    submission_status: str

# HubSpot Service
class HubSpotService:
    BASE_URL = "https://api.hubapi.com"
    
    def __init__(self):
        self.api_key = os.environ.get('HUBSPOT_API_KEY')
        if not self.api_key:
            logging.warning("HUBSPOT_API_KEY not found in environment variables")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
    
    async def create_contact(self, name: str, email: str, message: str) -> dict:
        """Create or update a contact in HubSpot"""
        url = f"{self.BASE_URL}/crm/v3/objects/contacts"
        
        # Extract first and last name from full name
        name_parts = name.strip().split(maxsplit=1)
        firstname = name_parts[0]
        lastname = name_parts[1] if len(name_parts) > 1 else ""
        
        payload = {
            "properties": {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "message": message,
            }
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    url,
                    headers=self.headers,
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as response:
                    data = await response.json()
                    
                    if response.status not in [200, 201]:
                        error_message = data.get("message", "Unknown error")
                        logging.error(f"HubSpot API error: {error_message}")
                        raise Exception(f"HubSpot API error: {error_message}")
                    
                    return {
                        "success": True,
                        "hubspot_contact_id": data.get("id"),
                        "data": data
                    }
        except Exception as e:
            logging.error(f"Failed to create HubSpot contact: {str(e)}")
            raise Exception(f"Failed to create HubSpot contact: {str(e)}")

hubspot_service = HubSpotService()

# Routes
@api_router.get("/")
async def root():
    return {"message": "Social Hub API", "status": "operational"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contacts", response_model=ContactResponse)
async def submit_contact(contact_data: ContactCreate):
    """Receive contact form submission, save to MongoDB, and create HubSpot contact"""
    try:
        # Prepare contact document for MongoDB
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": contact_data.name,
            "email": contact_data.email,
            "message": contact_data.message,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "hubspot_contact_id": None,
            "submission_status": "pending",
        }
        
        # Insert into MongoDB
        await db.contacts.insert_one(contact_doc)
        
        # Create contact in HubSpot
        try:
            hubspot_response = await hubspot_service.create_contact(
                contact_data.name,
                contact_data.email,
                contact_data.message
            )
            
            # Update MongoDB document with HubSpot contact ID
            await db.contacts.update_one(
                {"id": contact_doc["id"]},
                {
                    "$set": {
                        "hubspot_contact_id": hubspot_response["hubspot_contact_id"],
                        "submission_status": "completed",
                    }
                }
            )
            
            contact_doc["hubspot_contact_id"] = hubspot_response["hubspot_contact_id"]
            contact_doc["submission_status"] = "completed"
            
        except Exception as hubspot_error:
            logging.error(f"HubSpot creation failed: {str(hubspot_error)}")
            # Update status to indicate HubSpot sync failed, but local save succeeded
            await db.contacts.update_one(
                {"id": contact_doc["id"]},
                {"$set": {"submission_status": "hubspot_failed"}}
            )
            contact_doc["submission_status"] = "hubspot_failed"
        
        return ContactResponse(
            id=contact_doc["id"],
            name=contact_data.name,
            email=contact_data.email,
            message=contact_data.message,
            hubspot_contact_id=contact_doc.get("hubspot_contact_id"),
            created_at=contact_doc["created_at"],
            submission_status=contact_doc["submission_status"]
        )
        
    except Exception as e:
        logging.error(f"Contact submission error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process contact submission"
        )

@api_router.get("/contacts")
async def get_contacts():
    """Retrieve all submitted contacts from MongoDB"""
    try:
        contacts = await db.contacts.find({}, {"_id": 0}).to_list(100)
        
        return {
            "success": True,
            "count": len(contacts),
            "data": contacts
        }
    except Exception as e:
        logging.error(f"Error retrieving contacts: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve contacts"
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
