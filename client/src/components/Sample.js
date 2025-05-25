"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const Sample = () => {
  const galleryRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const gallery = galleryRef.current
    const section = sectionRef.current

    if (!gallery || !section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${gallery.scrollWidth - window.innerWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(gallery, {
      x: () => -(gallery.scrollWidth - window.innerWidth),
      ease: "none",
    })

    gsap.from(".video-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })

    gsap.from(".gold-line", {
      width: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 65%",
        scrub: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Sample video data with URLs
  const videos = [
    {
      id: 1,
      title: "Cinematic Commercial",
      description: "Luxury brand promotion with stunning visuals",
      duration: "0:45",
      videoUrl: "https://res.cloudinary.com/dof7yblai/video/upload/v1747895249/Sequence_01_cq8dxe.mp4",
    },
    {
      id: 2,
      title: "Product Animation",
      description: "3D product showcase with detailed animation",
      duration: "0:30",
      videoUrl: "https://res.cloudinary.com/dof7yblai/video/upload/v1747895342/Finaaallll_Clothing_ibw7qq.mp4",
    },
    {
      id: 3,
      title: "Music Video Effects",
      description: "Visual effects for award-winning music video",
      duration: "3:15",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      title: "Documentary VFX",
      description: "Historical recreation with realistic effects",
      duration: "2:20",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 5,
      title: "Corporate Branding",
      description: "Elegant motion graphics for corporate identity",
      duration: "1:10",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 6,
      title: "Event Promo",
      description: "Dynamic event promotion with 3D elements",
      duration: "0:55",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="bg-black h-screen w-screen overflow-hidden relative z-20"
      style={{ isolation: "isolate" }}
    >
      <div className="absolute top-10 left-10 z-10">
        <h2 className="text-[#c4a47c] text-5xl font-bold mb-2">Our Work</h2>
        <div className="gold-line h-[2px] bg-[#c4a47c] w-full mb-16"></div>
      </div>

      <div
        ref={galleryRef}
        className="flex items-center h-screen pt-20 pb-10 will-change-transform"
        style={{ width: `${videos.length * 400 + 100}px` }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-card flex-shrink-0 w-[350px] h-[500px] mx-6 rounded-lg overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10 pointer-events-none"></div>

            <video
              src={video.videoUrl}
              className="w-full h-full object-cover"
              preload="metadata"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />

            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">{video.title}</h3>
              <p className="text-white/70 mb-4">{video.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#c4a47c] text-sm">{video.duration}</span>
                <button
                  className="bg-[#c4a47c] text-black rounded-full p-3 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                  onClick={() => window.open(video.videoUrl, "_blank")}
                >
                  <Play className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sample
