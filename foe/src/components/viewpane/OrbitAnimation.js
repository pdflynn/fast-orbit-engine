import React from 'react'
import { useFrame } from '@react-three/fiber'
import { getGlobalTime } from '../../App'

const OrbitAnimation = ({ts, xs, ys, zs, color}) => {

    const myMesh = React.useRef()
    const orbitalPeriod = ts[ts.length - 1];

    // Initialize 
    var globalTime = getGlobalTime();
    var numOrbits = 0;
    
    // Initialize counting variables
    var nextTime = ts[0];
    const dt = ts[1] - ts[0];
    var currentIndx = 0;
    
    // Occurs every frame
    useFrame(() => {
        globalTime = getGlobalTime();
        // console.log(globalTime);
        var timeInOrbit = globalTime - (numOrbits * orbitalPeriod);
        currentIndx = Math.floor(timeInOrbit / dt);

        // Only update if we've passed the appropriate time
        if (timeInOrbit >= nextTime) {
            myMesh.current.position.x = xs[currentIndx];
            myMesh.current.position.y = zs[currentIndx];
            myMesh.current.position.z = ys[currentIndx];
            nextTime = ts[currentIndx]
            // Handle wrapping around back to the beginning of array
            if (currentIndx>=ts.length) {
                numOrbits++;
                // console.log(numOrbits); // for debug: log orbit ticker
                nextTime = ts[0]; // reset time to 0
                myMesh.current.position.x = xs[0];
                myMesh.current.position.y = zs[0];
                myMesh.current.position.z = ys[0];
                currentIndx = 0; // reset index to 0
            }

        }

        
    })

    return (
        <mesh position={[8.5, 0, 0]} ref={myMesh}>
            <sphereGeometry args={[0.2, 64, 64]}/>
            <meshBasicMaterial color={color} />
        </mesh>
    )
}

export default OrbitAnimation
