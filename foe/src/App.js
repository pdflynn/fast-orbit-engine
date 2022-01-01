import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import "./styles.css";

const R_EARTH = 6.371;

function Sphere() {
  return (
    <mesh position={[0,0,0]}>
      <sphereBufferGeometry attach="geometry" args={[R_EARTH, 32, 32]}/>
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  );
}

function OrbitTrace() {

}


export default function App() {
  return (
    <Canvas >
      <OrbitControls minDistance={10} maxDistance={75} />
      <Stars radius={300}/>
      <ambientLight intensity={0.5} />
      <spotLight position={[25, 0, 0]} />
      <Sphere />
    </Canvas>
  );
}

