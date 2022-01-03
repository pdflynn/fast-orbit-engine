import React from 'react'
import { useFrame } from '@react-three/fiber'
import { getGlobalTime } from '../../App'

const OrbitAnimation = ({ts, xs, ys, zs, color}) => {

    const myMesh = React.useRef()
    const orbitalPeriod = ts[ts.length - 1];

    var globalTime = 0; // TODO: get global time
    var numOrbits = 0;
    
    // Initialize counting variables
    var i = 0;
    var nextTime = ts[0];
    


    useFrame(() => {
        
        globalTime = getGlobalTime();
        
        var timeInOrbit = globalTime - (numOrbits * orbitalPeriod);

        if (timeInOrbit >= nextTime) {
            myMesh.current.position.x = xs[i+1];
            myMesh.current.position.y = zs[i+1];
            myMesh.current.position.z = ys[i+1];
            nextTime = ts[i+1]
            i++;

            if (i==ts.length) {
                numOrbits++;
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
