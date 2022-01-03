const Sphere = ({radius}) => {
    return (
        <mesh position={[0,0,0]}>
        <sphereBufferGeometry attach="geometry" args={[radius, 64, 64]}/>
        <meshStandardMaterial attach="material" color="#451804" />
        </mesh>
    );
}

export default Sphere