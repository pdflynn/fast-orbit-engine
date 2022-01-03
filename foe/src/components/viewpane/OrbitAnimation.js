import React from 'react'
import { useFrame } from '@react-three/fiber'

const OrbitAnimation = ({ts, xs, ys, zs, color}) => {

    const myMesh = React.useRef()

    var i=0;
    var j=0;

    useFrame(({ clock }) => {
        // TODO: figure out how to scale time properly
        if (j % 5 === 0) {
            myMesh.current.position.x = xs[i];
            myMesh.current.position.z = ys[i];
            myMesh.current.position.y = zs[i];
            i < xs.length ? i++ : i=0;
        }
        j++;
        
    })

    return (
        <mesh position={[8.5, 0, 0]} ref={myMesh}>
            <sphereGeometry args={[0.2, 64, 64]}/>
            <meshBasicMaterial color={color} />
        </mesh>
    )
}

export default OrbitAnimation
