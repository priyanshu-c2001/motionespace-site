"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Text = () => {
  useEffect(() => {
    var textContainer = document.getElementById("text")
    if (!textContainer) return

    // Get all bullet point divs
    var bulletPoints = textContainer.querySelectorAll("div")

    // Process each bullet point
    bulletPoints.forEach((bulletPoint) => {
      var txtcon = bulletPoint.textContent
      var splittxt = txtcon.split("")
      var clutter = ""
      splittxt.forEach((e) => {
        if (e === " ") {
          clutter += `<span>&nbsp;</span>` // Handle spaces explicitly
        } else {
          clutter += `<span>${e}</span>`
        }
      })
      bulletPoint.innerHTML = clutter
    })

    // Style all spans
    var elem = document.querySelectorAll("#text div span")
    elem.forEach((e) => {
      e.style.display = "inline-block"
      e.style.lineHeight = "1"
      e.style.paddingTop = "5px"
    })

    // Create a new ScrollTrigger for the text animation
    gsap.from("#text div span", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: "#txt-container",
        start: "0%",
        end: "bottom 50%",
        scrub: 3,
        ease: "circ.out",
        pin: true,
      },
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === "#txt-container") {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div id="txt-container" className="flex justify-center items-center h-screen w-full bg-black">
      <div className="w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-white text-center">Why Choose Us?</h1>
        <div id="text" className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white space-y-8">
          <div className="text-[#c4a47c]">→ Unparalleled Creativity: We spark bold, unique visuals that make your           brand shine.</div>
          <div>→ Client-Centric Innovation: Your vision guides us; we craft it with care.</div>
          <div className="text-[#c4a47c]">→ Speed, Quality, and Reliability: Fast, flawless work you can always trust.</div>
          <div>→ Animations That Tell Your Story: Our animations bring your brand's heart     to life.</div>
        </div>
      </div>
    </div>
  )
}

export default Text
