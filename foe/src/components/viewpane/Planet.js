import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { getGlobalTime } from '../../App';

import EarthDayMap from "./planet_textures/8k_earth_daymap.jpg";
import EarthNightMap from "./planet_textures/8k_earth_nightmap.jpg"
import EarthNormalMap from "./planet_textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "./planet_textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "./planet_textures/8k_earth_clouds.jpg";

const Planet = ({radius, siderealDay}) => {
    // TODO: Don't hard-code the textures. Generalize in the future for other planets.
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );

    // counting variables
    var nextTime = 0;
    var globalTime = getGlobalTime();
    var angularVelocity = (2*Math.PI) / siderealDay; // rad per sec
    var changePerMin = angularVelocity * 60; // rad per min

    const planetRef = useRef();
    const cloudsRef = useRef();

    // TODO: see OrbitAnimation.js line 19
    useFrame(() => {
        globalTime = getGlobalTime();
        if (globalTime > nextTime) {
            planetRef.current.rotation.y += changePerMin;
            cloudsRef.current.rotation.y += changePerMin;
            nextTime += 60;
        }


    });

    return (
        <>
            <mesh ref={cloudsRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1.005*radius, 32, 32]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh ref={planetRef} position={[0, 0, 0]}>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7}
                />
            </mesh>
        </>
     
     );
    

}

export default Planet