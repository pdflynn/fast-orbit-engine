import * as THREE from 'three'

// OrbitTrace
// Draws a continuous line for an array of x, y, and z points
// Notes:
//      -Input points in traditional (not WebGL) nomenclature. Z is up.
const OrbitTrace = ({xs, ys, zs, color}) => {
    // Merges x,y,z point lists into an array of Float32Arrays which can
    // be iterated through to produce THREE Vector3 objects
    const vertices = xs.map((item, i) => {return Float32Array.from([item, zs[i], ys[i]])})

    // Turn coordinates into Vector3 objects
    const points = [];
    for (var i=0; i<vertices.length;i++) {
        points.push(new THREE.Vector3(vertices[i][0], vertices[i][1], vertices[i][2]))
    }
    // For debugging
    // console.log(points)

    // Creates a BufferGeometry object from the Vector3 objects
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

    // Use declarative (react-three-fiber) statements to return
    // a group of lines centered at the origin
    return (
        <group position={[0, 0, 0]}>
            <line geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color={color} 
                linewidth={10} linecap={'round'} linejoin={'round'} 
                dashsize={10} gapsize={10}/>
            </line>
        </group>
        
    );
  }

export default OrbitTrace;