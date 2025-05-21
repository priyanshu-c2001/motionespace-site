import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import output from "url:../assets/output.png";

const Cyl = () => {
    let tex = useTexture(output);
    let cyl = useRef(null);
    // console.log(tex)
    useFrame((state, delta) => {
        cyl.current.rotation.y += delta * 0.3;
    })
    return (
        <group>
            <mesh rotation={[0, 1.6, 0.4]} ref={cyl}  >
                <cylinderGeometry args={[1, 1, 1, , 80, 80, true]} />
                <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>

    )
}

export default Cyl;