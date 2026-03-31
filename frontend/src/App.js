import { useState } from "react";
import { motion } from "framer-motion";
import "@/App.css";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Facebook, Instagram, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/17KxZHNkCV/?mibextid=wwXIfr",
      icon: Facebook,
      color: "#1877F2",
      gradient: "from-blue-600 to-blue-400"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/hunt.ethan99?igsh=MWlldjhscnQ1ZWdmMA%3D%3D&utm_source=qr",
      icon: Instagram,
      color: "#E4405F",
      gradient: "from-purple-600 via-pink-600 to-orange-500"
    },
    {
      name: "Snapchat",
      url: "https://www.snapchat.com/add/hunt.ethan99?share_id=DBx3CpPKQe6a92EEQVZ-LQ&locale=en_US",
      icon: MessageCircle,
      color: "#FFFC00",
      gradient: "from-yellow-400 to-yellow-300"
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@hunt.ethan99?_r=1&_t=ZP-959Zjic1rVm",
      icon: Send,
      color: "#000000",
      gradient: "from-gray-900 to-gray-700"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast.success("Message sent! I'll get back to you soon. 🎉", {
        duration: 3000,
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.", {
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20" data-testid="hero-section">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Profile Photo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                className="mb-8 flex justify-center"
                data-testid="profile-photo"
              >
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl backdrop-blur-sm bg-white/30">
                    <img
                      src="https://customer-assets.emergentagent.com/job_pixel-dev-quest-21/artifacts/pbhnb0v2_IMG_2365.jpeg"
                      alt="Samuel Ethan Hunt"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white text-xl">✨</span>
                  </div>
                </div>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
                data-testid="hero-name"
              >
                Samuel Ethan Hunt
              </motion.h1>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
                data-testid="hero-bio"
              >
                Reminding everyone you have free will…do with that as you will.
              </motion.p>

              {/* Quick CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button
                  onClick={() => document.getElementById('social-links')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg text-lg"
                  data-testid="hero-follow-cta"
                >
                  Subscribe & Follow
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-12 sm:py-16 lg:py-20" data-testid="about-section">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6" data-testid="about-title">
                About Me
              </h2>
              
              <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl p-8 rounded-2xl mb-8">
                <div className="space-y-6 text-gray-700">
                  <p className="text-lg leading-relaxed">
                    Born in <span className="font-semibold text-gray-900">Jacksonville, Florida</span>, now calling <span className="font-semibold text-gray-900">Clayton, North Carolina</span> home. I'm just a dude navigating life, one authentic moment at a time.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 my-8">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">🎵</span> Music Lover
                      </h3>
                      <p className="text-sm">From country roads to grunge vibes, my playlists tell my story. Music is my therapy, my escape, my energy.</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">🌟</span> Authentic Living
                      </h3>
                      <p className="text-sm">No filters, no pretending. Just real life, real moments, and real connections with amazing people.</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">🎬</span> Content Creator
                      </h3>
                      <p className="text-sm">Sharing my journey, my thoughts, and my vibe across social media. Join me for the ride!</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">🌍</span> Free Spirit
                      </h3>
                      <p className="text-sm">Exploring life on my own terms. Adventure seeker, deep thinker, and believer in living your truth.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">My Mission</h3>
                    <p className="text-lg italic text-gray-800">
                      "To show the world that you can be <span className="font-bold text-purple-700">authentically YOU</span> and still be accepted, no matter who you are. We're all just navigating this crazy journey called life together."
                    </p>
                  </div>
                </div>
              </Card>
              
              {/* CTA Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="backdrop-blur-md bg-gradient-to-br from-purple-500/90 to-pink-500/90 border-white/30 shadow-2xl p-8 rounded-2xl text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Join the Journey
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    Follow me on social media for daily vibes, real talk, and authentic content. Let's connect!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      onClick={() => document.getElementById('social-links')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-6 rounded-xl shadow-lg text-lg"
                      data-testid="cta-follow-button"
                    >
                      Follow Me Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Music Playlists Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-pink-50" data-testid="music-section">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="music-title">
                  My Playlists
                </h2>
                <p className="text-lg text-gray-600">
                  Vibe with me. Listen while you browse and feel the energy.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Vibe Playlist */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  data-testid="playlist-vibe"
                >
                  <Card className="backdrop-blur-md bg-white/70 border-white/30 shadow-xl p-6 rounded-2xl h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎵</span> Vibe
                    </h3>
                    <div className="aspect-square w-full">
                      <iframe
                        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                        frameBorder="0"
                        height="450"
                        style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px' }}
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                        src="https://embed.music.apple.com/us/playlist/vibe/pl.u-jV890v9sDBrNkoY"
                      />
                    </div>
                  </Card>
                </motion.div>

                {/* Country Vibes Playlist */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  data-testid="playlist-country"
                >
                  <Card className="backdrop-blur-md bg-white/70 border-white/30 shadow-xl p-6 rounded-2xl h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🤠</span> Country Vibes
                    </h3>
                    <div className="aspect-square w-full">
                      <iframe
                        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                        frameBorder="0"
                        height="450"
                        style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px' }}
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                        src="https://embed.music.apple.com/us/playlist/country-vibes/pl.u-2aoq8meSG24v5zB"
                      />
                    </div>
                  </Card>
                </motion.div>

                {/* Rainy Weather Playlist */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  data-testid="playlist-rainy"
                >
                  <Card className="backdrop-blur-md bg-white/70 border-white/30 shadow-xl p-6 rounded-2xl h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🌧️</span> Rainy Weather
                    </h3>
                    <div className="aspect-square w-full">
                      <iframe
                        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                        frameBorder="0"
                        height="450"
                        style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px' }}
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                        src="https://embed.music.apple.com/us/playlist/rainy-weather/pl.u-8aAVXDVTvJB1G7R"
                      />
                    </div>
                  </Card>
                </motion.div>

                {/* Grunge Playlist */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  data-testid="playlist-grunge"
                >
                  <Card className="backdrop-blur-md bg-white/70 border-white/30 shadow-xl p-6 rounded-2xl h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎸</span> Grunge
                    </h3>
                    <div className="aspect-square w-full">
                      <iframe
                        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                        frameBorder="0"
                        height="450"
                        style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px' }}
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                        src="https://embed.music.apple.com/us/playlist/grunge/pl.u-2aoq8DqiG24v5zB"
                      />
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Links Section */}
        <section id="social-links" className="py-8 sm:py-12" data-testid="social-links-section">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8" data-testid="social-links-title">
                Connect With Me
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group"
                      data-testid={`social-link-${social.name.toLowerCase()}`}
                    >
                      <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                              {social.name}
                            </h3>
                            <p className="text-sm text-gray-500">Follow me</p>
                          </div>
                          <svg
                            className="w-6 h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Card>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Feeds Section */}
        <section className="py-8 sm:py-12" data-testid="social-feeds-section">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8" data-testid="social-feeds-title">
                Recent Posts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Facebook Feed */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  data-testid="facebook-feed"
                >
                  <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl p-6 rounded-2xl h-[500px] overflow-hidden">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Facebook className="w-6 h-6 text-blue-600" />
                      Facebook
                    </h3>
                    <div className="w-full h-[400px] overflow-auto">
                      <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17KxZHNkCV%2F&tabs=timeline&width=340&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="100%"
                        height="400"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  </Card>
                </motion.div>

                {/* Instagram Feed */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  data-testid="instagram-feed"
                >
                  <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl p-6 rounded-2xl h-[500px] overflow-hidden">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Instagram className="w-6 h-6 text-pink-600" />
                      Instagram
                    </h3>
                    <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                      <a
                        href="https://www.instagram.com/hunt.ethan99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center p-6"
                      >
                        <Instagram className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                        <p className="text-gray-700 font-medium">@hunt.ethan99</p>
                        <p className="text-sm text-gray-500 mt-2">Click to view profile</p>
                      </a>
                    </div>
                  </Card>
                </motion.div>

                {/* TikTok Feed */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  data-testid="tiktok-feed"
                >
                  <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl p-6 rounded-2xl h-[500px] overflow-hidden">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Send className="w-6 h-6 text-gray-900" />
                      TikTok
                    </h3>
                    <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                      <a
                        href="https://www.tiktok.com/@hunt.ethan99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center p-6"
                      >
                        <Send className="w-16 h-16 text-gray-900 mx-auto mb-4" />
                        <p className="text-gray-700 font-medium">@hunt.ethan99</p>
                        <p className="text-sm text-gray-500 mt-2">Click to view profile</p>
                      </a>
                    </div>
                  </Card>
                </motion.div>

                {/* Snapchat Feed */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  data-testid="snapchat-feed"
                >
                  <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl p-6 rounded-2xl h-[500px] overflow-hidden">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 text-yellow-500" />
                      Snapchat
                    </h3>
                    <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl">
                      <a
                        href="https://www.snapchat.com/add/hunt.ethan99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center p-6"
                      >
                        <MessageCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                        <p className="text-gray-700 font-medium">hunt.ethan99</p>
                        <p className="text-sm text-gray-500 mt-2">Click to add me</p>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 lg:py-20" data-testid="contact-section">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4" data-testid="contact-title">
                Get In Touch
              </h2>
              <p className="text-center text-gray-600 mb-8">Have a question or want to work together?</p>

              <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="backdrop-blur-sm bg-white/50 border-white/30 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                      required
                      minLength={2}
                      maxLength={100}
                      disabled={isSubmitting}
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="backdrop-blur-sm bg-white/50 border-white/30 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                      required
                      disabled={isSubmitting}
                      data-testid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me what's on your mind..."
                      className="backdrop-blur-sm bg-white/50 border-white/30 focus:border-purple-400 focus:ring-purple-400 min-h-[120px] rounded-xl"
                      required
                      minLength={10}
                      maxLength={1000}
                      disabled={isSubmitting}
                      data-testid="contact-message-textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    data-testid="contact-submit-button"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 backdrop-blur-md bg-white/40 border-t border-white/20" data-testid="footer">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                © 2025 Samuel Ethan Hunt. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Built with passion and purpose
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
