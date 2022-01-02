import * as THREE from 'three'

const OrbitTrace = ({xs, ys, zs}) => {

    const vertices_alt = xs.map((item, i) => {return Float32Array.from([item, zs[i], ys[i]])})

    const points = [];
    for (var i=0; i<vertices_alt.length;i++) {
        points.push(new THREE.Vector3(vertices_alt[i][0], vertices_alt[i][1], vertices_alt[i][2]))
    }
    console.log(points)
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

    return (
        // <mesh position={[0,0,0]}>
        //     <bufferGeometry attach="geometry"
        //     vertices={vertices_alt.map(v => new THREE.Vector3(...v))}/>
        //     <meshNormalMaterial wireframe attach="material" color="pink" />
        // </mesh>

        // <mesh position={[0,0,0]}>
        //     <bufferGeometry attach="geometry">
        //         <bufferAttribute attach="position">
        //             array={vertices}
        //             itemSize={3}
        //             numVertices={vertices.length}
        //             count={vertices.length / 3}
        //         </bufferAttribute>
        //     </bufferGeometry>
        //     <meshNormalMaterial attach="material" color="pink" />
        // </mesh>
        <group position={[0, 0, 0]}>
            <line geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color={'white'} 
                linewidth={10} linecap={'round'} linejoin={'round'} />
            </line>
        </group>
        
    );
  }

export default OrbitTrace;