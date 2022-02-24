import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

import EarthDayMap from "./planet_textures/8k_earth_daymap.jpg";
import EarthNightMap from "./planet_textures/8k_earth_nightmap.jpg"
import EarthNormalMap from "./planet_textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "./planet_textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "./planet_textures/8k_earth_clouds.jpg";

const Planet = ({radius}) => {
    // TODO: Don't hard-code the textures. Generalize in the future for other planets.
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );

    const planetRef = useRef();
    const cloudsRef = useRef();

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