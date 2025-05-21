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
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="py-4 space-y-4">
            {["Home", "Services", "Plans"].map((item, index) => (
              <Link
                key={index}
                to={item === "Home" ? `/` : `/${item.toLowerCase()}`}
                className="block text-white hover:text-gray-300 px-3 py-2 text-sm font-bold uppercase tracking-wider"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
