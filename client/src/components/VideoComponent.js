"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Boatparty from "url:../assets/video.mp4";

gsap.registerPlugin(ScrollTrigger)

const VideoComponent = () => {
    useEffect(() => {
        const vidContainer = document.querySelector("#vid-container")
        const sloganCont = document.querySelector("#slogan-cont")

        // Video Shrinking & Moving Slightly Left
        gsap.to(vidContainer, {
            scale: 0.5,
            x: "-10vw",
            duration: 2,
            scrollTrigger: {
                trigger: "#scroll-section",
                scroller: "body",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                ease: "circ.out",
            },
        })

        // Text Appearing & Moving Up to center
        gsap.fromTo(
            sloganCont,
            { y: "100vh" }, // Start well below the screen
            {
                y: "0vh", // Stop in the middle
                duration: 2,
                scrollTrigger: {
                    trigger: "#scroll-section",
                    scroller: "body",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    ease: "circ.out",
                },
            },
        )
    }, [])

    return (
        <div id="scroll-section" className="fixed min-h-[200vh] bg-black">
            {/* Video Section */}
            <div
                id="vid-container"
                className="fixed top-0 left-0 w-full h-screen flex justify-center items-center overflow-hidden"
            >
                <video id="vid" autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src={Boatparty} />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div
                id="slogan-cont"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center"
            >
                <h1 className="text-6xl md:text-8xl font-bold text-[#c4a47c] mix-blend-difference">DREAM DESIGN
                </h1>
                <h1 className="text-6xl md:text-8xl font-bold text-[#c4a47c] mix-blend-difference">DELIVER</h1>
            </div>
        </div>
    )
}

export default VideoComponent

