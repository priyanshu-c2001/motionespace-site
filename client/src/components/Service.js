import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Cyl from "./Cyl"
import { EffectComposer, ToneMapping } from "@react-three/postprocessing"
import { Bloom } from "@react-three/postprocessing"

const Service = () => {
  return (
    <div className="bg-black h-screen w-screen overflow-x-hidden relative">
      <Canvas flat camera={{ fov: 25 }}>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
        <ambientLight />
        <Cyl />
        <EffectComposer>
          <Bloom intensity={19.0} luminanceThreshold={0} luminanceSmoothing={0.9} mipmapBlur={true} />
          <ToneMapping adaptive />
        </EffectComposer>
      </Canvas>
      <div className="absolute top-[88%] z-10 left-0 w-full text-center opacity-80 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          <h3 className="text-white text-4xl md:text-6xl lg:text-8xl font-sans font-bold">
            Bookings Are Open Hurry Now!
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Service
