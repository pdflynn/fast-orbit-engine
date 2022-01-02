import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import "./styles.css";
import Sphere from "./components/viewpane/Sphere";
import OrbitTrace from "./components/viewpane/OrbitTrace";
import Line from "./components/viewpane/Line";

const R_EARTH = 6.371;


function App() {

  const x = [1, 0.81, 0.31, -.31, -.81, -1, -.81, -.31, 0.31, 0.81, 1];
  const y = [0, 0.59, 0.95, 0.95, 0.59, 0, -.59, -.95, -.95, -.59, 0];
  const z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // const x = [10, 0, 10, 10];
  // const y = [0, 10, 0, 0];
  // const z = [-10, 0, -10, 0];

  return (
    <div className='view-pane'>
      <Canvas >
        <OrbitTrace xs={x} ys={y} zs={z}/>
        <OrbitControls minDistance={10} maxDistance={75} />
        <Stars radius={200} depth={60} count={1000} factor={3} saturation={0.2}/>
        <ambientLight intensity={0.8} />
        {/* <Line start={[x[0], z[0], y[0]]} end={[x[1], z[1], y[1]]}/> */}
        {/* <spotLight position={[25, 0, 0]} /> */}
        {/* <Sphere radius={R_EARTH} /> */}
      </Canvas>
    </div>
  );
}

export default App;