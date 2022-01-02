const Sphere = ({radius}) => {
    return (
        <mesh position={[0,0,0]}>
        <sphereBufferGeometry attach="geometry" args={[radius, 32, 32]}/>
        <meshStandardMaterial attach="material" color="green" />
        </mesh>
    );
}

export default Sphere