import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Cyl from "./Cyl";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { Bloom } from "@react-three/postprocessing";

const Service = () => {
  return (
    <div className="bg-black h-screen w-screen overflow-x-hidden relative">
      <Canvas flat camera={{ fov: 25 }}>
        <OrbitControls
          enablePan={false} // Disable panning
          enableZoom={false} // Disable zooming, if you don't want it
          autoRotate={false} // Turn off automatic rotation
        />        <ambientLight />
        <Cyl />
        <EffectComposer>
          <Bloom
            intensity={19.0} // The bloom intensity.
            luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.9} // smoothness of the luminance threshold. Range is [0, 1]
            mipmapBlur={true} // Enables or disables mipmap blur.

          />
          <ToneMapping adaptive />
        </EffectComposer>
      </Canvas>
      <marquee
        className="text-white text-8xl font-sans font-bold absolute top-[88%] z-10 left-0 w-full text-center opacity-80"
        scrollamount="12"
      >
        <h3>Bookings Are Open Hurry Now!</h3>
      </marquee>
    </div>
  );
};

export default Service;