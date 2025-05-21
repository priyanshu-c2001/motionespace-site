"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VideoComponent from "./VideoComponent"
import logo from "url:../assets/logo.svg"
import Text from "./Text"
import Service from "./Service"
import VideoGallery from "./Sample"
import Footer from "./Footer"

gsap.registerPlugin(ScrollTrigger)

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function Hero() {
  const svgRef = useRef(null)
  const logoRef = useRef(null)
  const textSectionRef = useRef(null)
  const serviceSectionRef = useRef(null)
  const videoGallerySectionRef = useRef(null)
  const footerSectionRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current || !logoRef.current) return

    const svg = svgRef.current
    const logo = logoRef.current

    // Timeline animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "top -100%",
        scrub: 2,
      },
    })

    // Ensure the logo stays centered and only zooms in
    tl.to(logo, {
      scale: 80,
      duration: 1,
      ease: "power2.inOut",
      force3D: true,
      transformOrigin: "center center",
    })

    // Fade out effect for white layer
    tl.to(
      "#whiteLayer",
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0.25,
    )

    // Create a ScrollTrigger for the Text component to appear after the first animation sequence
    ScrollTrigger.create({
      trigger: "#scroll-section",
      start: "bottom top", // Start when the scroll-section bottom hits the top of viewport
      end: "+=100%",
      onEnter: () => {
        // Make the text section visible when entering
        if (textSectionRef.current) {
          gsap.to(textSectionRef.current, {
            autoAlpha: 1,
            duration: 0.5,
            visibility: "visible",
          })
        }
      },
      onLeaveBack: () => {
        // Hide the text section when scrolling back up
        if (textSectionRef.current) {
          gsap.to(textSectionRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            visibility: "hidden",
          })
        }
      },
    })

    // Create a ScrollTrigger for the Service component to appear after the Text component
    ScrollTrigger.create({
      trigger: "#txt-container",
      start: "bottom bottom", // Start when the text container bottom hits the top of viewport
      end: "+=100%",
      onEnter: () => {
        // Make the service section visible when entering
        if (serviceSectionRef.current) {
          gsap.to(serviceSectionRef.current, {
            autoAlpha: 1,
            visibility: "visible",
          })
        }
      },
      onLeaveBack: () => {
        // Hide the service section when scrolling back up
        if (serviceSectionRef.current) {
          gsap.to(serviceSectionRef.current, {
            autoAlpha: 0,
            visibility: "hidden",
          })
        }
      },
    })

    // Create a ScrollTrigger for the VideoGallery component to appear after the Service component
    ScrollTrigger.create({
      trigger: serviceSectionRef.current,
      start: "bottom bottom", // Start when the service section bottom hits the bottom of viewport
      end: "+=100%",
      onEnter: () => {
        // Make the video gallery section visible when entering
        if (videoGallerySectionRef.current) {
          gsap.to(videoGallerySectionRef.current, {
            autoAlpha: 1,
            visibility: "visible",
            duration: 0.1, // Faster transition
          })
        }
      },
      onLeaveBack: () => {
        // Hide the video gallery section when scrolling back up
        if (videoGallerySectionRef.current) {
          gsap.to(videoGallerySectionRef.current, {
            autoAlpha: 0,
            visibility: "hidden",
            duration: 0.1, // Faster transition
          })
        }
      },
    })

    gsap.to(".gold-line", {
      width: "50%",
      ease: "none",
      scrollTrigger: {
        trigger: serviceSectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    })

    // Create a ScrollTrigger for the Footer component to appear after the VideoGallery component
    // This trigger is set up differently because we want it to appear after the horizontal scroll ends
    if (videoGallerySectionRef.current && footerSectionRef.current) {
      const videoGallerySection = videoGallerySectionRef.current

      // Create a ScrollTrigger that will show the footer after the video gallery's horizontal scroll completes
      ScrollTrigger.create({
        trigger: videoGallerySection,
        start: "bottom bottom", // Start when the bottom of video gallery hits the bottom of viewport
        end: "+=100%",
        onEnter: () => {
          // Make the footer visible when entering
          gsap.to(footerSectionRef.current, {
            autoAlpha: 1,
            visibility: "visible",
            duration: 0.1, // Faster transition
          })
        },
        onLeaveBack: () => {
          // Hide the footer when scrolling back up
          gsap.to(footerSectionRef.current, {
            autoAlpha: 0,
            visibility: "hidden",
            duration: 0.1, // Faster transition
          })
        },
      })
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <VideoComponent />
      <svg
        ref={svgRef}
        className="fixed top-0 left-0 w-full h-screen will-change-transform"
        style={{ backfaceVisibility: "hidden" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="mask">
            <rect width="100%" height="100%" fill="white" />
            <image
              ref={logoRef}
              href={logo}
              x="50%"
              y="50%"
              width="700"
              height="700"
              transform="translate(-350,-350)"
              style={{
                backfaceVisibility: "hidden",
                transformOrigin: "center center",
              }}
              className="will-change-transform"
              preserveAspectRatio="xMidYMid meet"
            />
          </mask>
        </defs>
        <rect id="whiteLayer" width="100%" height="100%" fill="transparent" />
        <rect width="100%" height="100%" fill="black" mask="url(#mask)" />
      </svg>

      {/* First section height for the initial animations */}
      <div className="h-[200vh]" />

      {/* Text section that appears after the first animation sequence */}
      <div ref={textSectionRef} className="relative opacity-0" style={{ visibility: "hidden" }}>
        <Text />
      </div>

      {/* Service section that appears after the Text component */}
      <div
        ref={serviceSectionRef}
        className="relative opacity-0 bg-black w-full min-h-screen z-20"
        style={{ visibility: "hidden", isolation: "isolate" }}
      >
        <h1 className="text-[#c4a47c] font-bold text-5xl text-center">Our Services</h1>
        <div className="gold-line h-[2px] bg-[#c4a47c] w-0 mx-auto transition-all duration-500 mb-16"></div>
        <Service />
      </div>

      {/* VideoGallery section that appears after the Service component */}
      <div
        ref={videoGallerySectionRef}
        className="relative opacity-0 bg-black w-full min-h-screen z-20"
        style={{ visibility: "hidden", isolation: "isolate" }}
      >
        <VideoGallery />
      </div>

      {/* Footer section that appears after the VideoGallery component */}
      <div
        ref={footerSectionRef}
        className="relative opacity-0 bg-black w-full min-h-screen z-20"
        style={{ visibility: "hidden", isolation: "isolate" }}
      >
        <Footer />
      </div>
    </>
  )
}

export default Hero;
