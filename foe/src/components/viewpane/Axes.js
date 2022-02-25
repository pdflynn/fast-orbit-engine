import * as THREE from 'three'

const Axes = ({length}) => {
    //  IT'S Y-Z-X: left handed coordinate system!!!
    const origin = new THREE.Vector3(0, 0, 0);
    const xVec = new THREE.Vector3(0, 0, length);
    const yVec = new THREE.Vector3(length, 0, 0);
    const zVec = new THREE.Vector3(0, length, 0);

    const xPts = [origin, xVec];
    const yPts = [origin, yVec];
    const zPts = [origin, zVec];

    const xLine = new THREE.BufferGeometry().setFromPoints(xPts);
    const yLine = new THREE.BufferGeometry().setFromPoints(yPts);
    const zLine = new THREE.BufferGeometry().setFromPoints(zPts);

    return (
        <group position={[0, 0, 0]}>
            <line geometry={xLine}>
                <lineBasicMaterial attach="material" color={"red"}
                linewidth={10} linecap={'round'} linejoin={'round'}/>
            </line>
            <line geometry={yLine}>
                <lineBasicMaterial attach="material" color={"green"}
                linewidth={10} linecap={'round'} linejoin={'round'}/>
            </line>
            <line geometry={zLine}>
                <lineBasicMaterial attach="material" color={"blue"}
                linewidth={10} linecap={'round'} linejoin={'round'}/>
            </line>
        </group>
    );
}

export default Axes;