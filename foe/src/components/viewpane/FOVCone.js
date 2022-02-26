import { useFrame } from '@react-three/fiber';
import React from 'react';
import { getGlobalTime } from '../../App'
import * as THREE from 'three';

const FOVCone = ({ ts, xs, ys, zs, r_cone, h_cone, delta_h, color }) => {

    // TODO: duplicate functionality in OrbitAnimation.js

    const coneMesh = React.useRef();
    const orbitalPeriod = ts[ts.length - 1];

    var globalTime = getGlobalTime();
    var numOrbits = 0;

    var nextTime = ts[0];
    const dt = ts[1] - ts[0];
    var currentIndx = 0;


    useFrame(() => {
        globalTime = getGlobalTime();
        var timeInOrbit = globalTime - (numOrbits * orbitalPeriod);
        currentIndx = Math.floor(timeInOrbit / dt);

        // Only update if we've passed the appropriate time
        if (timeInOrbit >= nextTime) {
            coneMesh.current.geometry = new THREE.ConeBufferGeometry(r_cone[currentIndx], h_cone[currentIndx], 64);
            // console.log(r_cone[currentIndx], h_cone[currentIndx])

            // these three lines just make the -z axis of the cone look at the origin
            var lookVector = new THREE.Vector3(-ys[currentIndx], -zs[currentIndx], -xs[currentIndx]);
            var axis = new THREE.Vector3(0, -1, 0);
            coneMesh.current.quaternion.setFromUnitVectors(axis, lookVector.clone().normalize());

            coneMesh.current.position.x = (ys[currentIndx] / 2);
            coneMesh.current.position.y = (zs[currentIndx] / 2);
            coneMesh.current.position.z = (xs[currentIndx] / 2);
            
            nextTime = ts[currentIndx]
            // Handle wrapping around back to the beginning of array
            if (currentIndx>=ts.length) {
                numOrbits++;
                nextTime = ts[0]; // reset time to 0
                coneMesh.current.geometry = new THREE.ConeBufferGeometry(r_cone[0], h_cone[0], 64);

                coneMesh.current.position.x = (ys[0] / 2);
                coneMesh.current.position.y = (zs[0] / 2);
                coneMesh.current.position.z = (xs[0] / 2);
                currentIndx = 0; // reset index to 0
            }

        }

    });

    return (
        <mesh position={[zs[0], ys[0], xs[0]]} ref={coneMesh}>
            <meshBasicMaterial  
                color={color}
                transparent={true}
                opacity={0.05}
            />
        </mesh>
    )


}

export default FOVCone;