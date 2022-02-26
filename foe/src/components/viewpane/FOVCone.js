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
            coneMesh.current.geometry.dispose(); // reference to the old one so we can clean up GPU memory
            coneMesh.current.geometry = new THREE.ConeBufferGeometry(r_cone[currentIndx] + 0.015, h_cone[currentIndx], 64);
            // oldCone.dispose(); // delete the old geometry
            // these three lines just make the -z axis of the cone look at the origin
            var lookVector = new THREE.Vector3(-ys[currentIndx], -zs[currentIndx], -xs[currentIndx]);
            var axis = new THREE.Vector3(0, -1, 0);
            coneMesh.current.quaternion.setFromUnitVectors(axis, lookVector.clone().normalize());

            var r = new THREE.Vector3(xs[currentIndx] / 2, ys[currentIndx] / 2, zs[currentIndx] / 2);
            var r_hat = r.clone().normalize();
            
            coneMesh.current.position.x = (0.5*delta_h[currentIndx]*r_hat.y + r.y);
            coneMesh.current.position.y = (0.5*delta_h[currentIndx]*r_hat.z + r.z);
            coneMesh.current.position.z = (0.5*delta_h[currentIndx]*r_hat.x + r.x);
            
            nextTime = ts[currentIndx]
            // Handle wrapping around back to the beginning of array
            if (currentIndx>=ts.length) {
                numOrbits++;
                nextTime = ts[0]; // reset time to 0
                coneMesh.current.geometry.dispose();
                coneMesh.current.geometry = new THREE.ConeBufferGeometry(r_cone[0] + 0.015, h_cone[0], 64);

                var r = new THREE.Vector3(xs[0] / 2, ys[0] / 2, zs[0] / 2);
                var r_hat = r.clone().normalize();
                coneMesh.current.position.x = ((0.5*delta_h[0]*r_hat.y + r.y));
                coneMesh.current.position.y = ((0.5*delta_h[0]*r_hat.z + r.z));
                coneMesh.current.position.z = ((0.5*delta_h[0]*r_hat.x + r.x));
                currentIndx = 0; // reset index to 0
            }

        }

    });

    return (
        <mesh position={[zs[0], ys[0], xs[0]]} ref={coneMesh}>
            <meshBasicMaterial  
                color={color}
                transparent={true}
                opacity={0.15}
                open={true}
            />
        </mesh>
    )


}

export default FOVCone;