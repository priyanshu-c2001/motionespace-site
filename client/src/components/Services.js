"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Code, Paintbrush, Video, Zap } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies.",
    icon: <Code className="h-10 w-10 text-[#c4a47c]" />,
    videos: [
      { id: 1, title: "React Portfolio Website", url: "https://www.youtube.com/embed/bmpI252DmiI" },
      { id: 2, title: "E-commerce Store", url: "https://www.youtube.com/embed/4mOkFXyxfsU" },
      { id: 3, title: "Admin Dashboard", url: "https://www.youtube.com/embed/wYpCWwD1oz0" },
      { id: 4, title: "Blog Platform", url: "https://www.youtube.com/embed/RVFAyFWO4go" },
    ],
    exitDirection: { x: "-100vw", y: 0 },
    enterDirection: { x: "-100vw", y: 0 },
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that enhance user experience.",
    icon: <Paintbrush className="h-10 w-10 text-[#c4a47c]" />,
    videos: [
      { id: 1, title: "Mobile App Design", url: "https://www.youtube.com/embed/c9Wg6Cb_YlU" },
      { id: 2, title: "Website Redesign", url: "https://www.youtube.com/embed/2ljPBDsX_BE" },
      { id: 3, title: "Design System Creation", url: "https://www.youtube.com/embed/RYDiDpW2VkM" },
      { id: 4, title: "UX Research Process", url: "https://www.youtube.com/embed/gGZGDnTY454" },
    ],
    exitDirection: { x: 0, y: "-100vh" },
    enterDirection: { x: 0, y: "-100vh" },
  },
  {
    id: 3,
    title: "Video Production",
    description: "High-quality video content for marketing and education.",
    icon: <Video className="h-10 w-10 text-[#c4a47c]" />,
    videos: [
      { id: 1, title: "Corporate Promo", url: "https://www.youtube.com/embed/rokGy0huYEA" },
      { id: 2, title: "Product Showcase", url: "https://www.youtube.com/embed/JkaxUblCGz0" },
      { id: 3, title: "Event Highlights", url: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
      { id: 4, title: "Tutorial Series", url: "https://www.youtube.com/embed/d46Azg3Pm4c" },
    ],
    exitDirection: { x: 0, y: "100vh" },
    enterDirection: { x: 0, y: "100vh" },
  },
  {
    id: 4,
    title: "Performance Optimization",
    description: "Speed up your digital products for better user experience.",
    icon: <Zap className="h-10 w-10 text-[#c4a47c]" />,
    videos: [
      { id: 1, title: "Website Speed Optimization", url: "https://www.youtube.com/embed/AQqFZ5t8uNc" },
      { id: 2, title: "React App Performance", url: "https://www.youtube.com/embed/5fLW5Q5ODiE" },
      { id: 3, title: "Database Optimization", url: "https://www.youtube.com/embed/FNtpPW_7H1k" },
      { id: 4, title: "Server-Side Rendering", url: "https://www.youtube.com/embed/GhVk9Y4rQw8" },
    ],
    exitDirection: { x: "100vw", y: 0 },
    enterDirection: { x: "100vw", y: 0 },
  },
]

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleServiceClick = (id) => {
    if (!isAnimating) {
      setIsAnimating(true)
      setSelectedService(id)
      setTimeout(() => setIsAnimating(false), 800)
    }
  }

  const handleBackClick = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setSelectedService(null)
      setTimeout(() => setIsAnimating(false), 800)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-black min-h-screen text-white">
      <div className="text-center mb-16 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#c4a47c] mb-4">Our Services</h1>
        <div className="w-24 h-1 bg-[#c4a47c] mx-auto"></div>
      </div>

      <AnimatePresence mode="wait">
        {selectedService === null ? (
          <motion.div
            key="services"
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, when: "afterChildren" } }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, ...service.enterDirection }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ ...service.exitDirection, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleServiceClick(service.id)}
                className="bg-zinc-900 border border-[#c4a47c]/30 rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer min-h-[200px]"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#c4a47c]">{service.title}</h3>
                <p className="text-zinc-400 mt-2">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleBackClick}
                className="h-10 w-10 flex items-center justify-center bg-zinc-900 border border-[#c4a47c] text-[#c4a47c] rounded hover:bg-zinc-800"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-[#c4a47c]">
                {services.find((s) => s.id === selectedService)?.title} Videos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services
                .find((s) => s.id === selectedService)
                ?.videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + video.id * 0.1 }}
                    className="bg-zinc-900 border border-[#c4a47c]/30 rounded-xl overflow-hidden"
                  >
                    <div className="aspect-video w-full">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-medium text-[#c4a47c]">{video.title}</h3>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Services;
