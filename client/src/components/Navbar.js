"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import logo2 from "url:../assets/logo2.png"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!navRef.current) return

    const showAnim = gsap
      .from(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1)

    ScrollTrigger.create({
      start: "10% top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play()
        } else {
          showAnim.reverse()
        }
      },
    })
  }, [])

  return (
    <div ref={navRef} className="fixed top-0 left-0 w-full z-50 mix-blend-difference bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo on the extreme left */}
          <div className="flex items-center mt-10">
            <img
              src={logo2 || "/placeholder.svg"}
              alt="Logo"
              className="h-28 w-28 md:h-40 md:w-40 object-contain pr-[20px] md:pr-[46px]"
            />
          </div>

          {/* Burger Menu for Mobile */}
          <div className="md:hidden z-[60] relative">
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                {/* First line - transforms to \ of the X */}
                <span
                  className={`absolute top-0.5 left-0 block w-6 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
                ></span>
                {/* Middle line - fades out */}
                <span
                  className={`absolute top-[11px] left-0 block w-6 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 translate-x-3" : "opacity-100"
                    }`}
                ></span>
                {/* Last line - transforms to / of the X */}
                <span
                  className={`absolute bottom-0.5 left-0 block w-6 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Navigation on the extreme right - Desktop */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-10">
              {["Home", "Services", "Plans"].map((item, index) => (
                <Link
                  key={index}
                  to={item === "Home" ? `/` : `/${item.toLowerCase()}`}
                  className="relative text-white hover:text-gray-300 px-3 py-2 text-xs font-bold uppercase tracking-wider group"
                >
                  {/* Original text */}
                  <span className="block transform transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                    {item}
                  </span>
                  {/* Line animation on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  {/* Hover text appears above the line */}
                  <span className="absolute top-full left-0 w-full text-center transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide from right */}
        <div
          className={`fixed top-0 right-0 h-screen bg-black/95 backdrop-blur-sm w-64 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden pt-24`}
        >
          <div className="flex flex-col space-y-8 px-8">
            {["Home", "Services", "Plans"].map((item, index) => (
              <Link
                key={index}
                to={item === "Home" ? `/` : `/${item.toLowerCase()}`}
                className="text-white hover:text-[#c4a47c] text-lg font-bold uppercase tracking-wider border-b border-gray-800 pb-3 transition-colors duration-200"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Overlay when menu is open */}
        {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}></div>}
      </div>
    </div>
  )
}

export default Navbar
