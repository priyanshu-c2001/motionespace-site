"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)
  const goldLineRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    const goldLine = goldLineRef.current
    if (!footer || !goldLine) return

    // Ensure the gold line is visible initially
    gsap.set(goldLine, { width: "100%" })

    // Animate footer elements when they come into view
    gsap.from(".footer-animate", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
    })

    // Animate the gold line
    gsap.fromTo(
      goldLine,
      { width: "0%" },
      {
        width: "100%",
        duration: 1.5,
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footer) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white min-h-screen w-full pt-20 pb-10 px-6 md:px-10 lg:px-20 relative z-30"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Gold line separator */}
        <div
          ref={goldLineRef}
          className="h-[2px] bg-[#c4a47c] mb-16"
          style={{ width: "100%" }} // Fallback width in case animation doesn't trigger
        ></div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-40">
          {/* Column 1: Logo and about */}
          <div className="footer-animate">
            <h2 className="text-[#c4a47c] text-3xl font-bold mb-6">MOTIONESPACE</h2>
            <p className="text-white/70 mb-6">
              At motionespace, we live by our tagline: Dream. Design. Deliver. We transform your boldest visions into
              stunning graphic designs, 3D models, product animations, and motion graphics, crafting visuals that
              captivate and elevate your brand.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c4a47c] hover:text-black transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c4a47c] hover:text-black transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c4a47c] hover:text-black transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c4a47c] hover:text-black transition-all duration-300"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-animate">
            <h3 className="text-white text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {["Graphic Designing", "Motion Graphics", "3D Model", "3D Product Animation"].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#c4a47c] transition-colors duration-300 flex items-center group"
                  >
                    <span>{service}</span>
                    <ArrowUpRight
                      size={14}
                      className="ml-2 opacity-0 transform translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-animate">
            <h3 className="text-white text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="text-[#c4a47c] mr-3 mt-1" size={18} />
                <span className="text-white/70">motionespace@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-[#c4a47c] mr-3 mt-1" size={18} />
                <span className="text-white/70">+919653530849, +917275742197</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-[#c4a47c] mr-3 mt-1" size={18} />
                <span className="text-white/70">XXXX</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-animate">
            <h3 className="text-white text-xl font-bold mb-6">Stay Updated</h3>
            <p className="text-white/70 mb-4">Subscribe to our newsletter for the latest projects and news.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[#c4a47c]"
              />
              <button
                type="submit"
                className="w-full bg-[#c4a47c] text-black font-medium py-2 rounded-md hover:bg-[#d5b58d] transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="footer-animate pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} motionespace. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookies", "Sitemap"].map((item, index) => (
                <a key={index} href="#" className="text-white/50 text-sm hover:text-[#c4a47c] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
