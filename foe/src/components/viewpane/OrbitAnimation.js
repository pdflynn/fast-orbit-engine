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
    var i = 0;
    var nextTime = ts[0];
    


    // Occurs every frame
    // Problem: this assumes an infinite framerate.
    // What we want to do on the frame update is:
    // On frame update:
    //      Map timeInOrbit to a ts value and get the index
    //      Set x, y, z, to their values at that index
    //      This way we won't run into a framerate bottleneck
    //      and can run the simulation very fast which might be
    //      helpful for long orbits.
    // The difficult part will be efficiently mapping timeInOrbit
    // to a ts value and finding the index.
    // Take a look at findIndex() and indexOf()
    // wait: if I know dt (which I should, pass it into orbitAnimation)
    //      then shouldn't I be able to mathematically calculate the
    //      index and do it in O(1)?
    useFrame(() => {
        globalTime = getGlobalTime();
        var timeInOrbit = globalTime - (numOrbits * orbitalPeriod);

        // Only update if we've passed the appropriate time
        if (timeInOrbit >= nextTime) {
            myMesh.current.position.x = xs[i+1];
            myMesh.current.position.y = zs[i+1];
            myMesh.current.position.z = ys[i+1];
            nextTime = ts[i+1]
            i++;
            // Handle wrapping around back to the beginning of array
            if (i==ts.length) {
                numOrbits++;
                console.log(numOrbits);
                nextTime = ts[0];
                myMesh.current.position.x = xs[0];
                myMesh.current.position.y = zs[0];
                myMesh.current.position.z = ys[0];
                i=0;
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
