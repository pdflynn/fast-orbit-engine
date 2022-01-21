import React from 'react';
import OrbitTrace from './OrbitTrace';
import OrbitAnimation from './OrbitAnimation';

const OrbitTraces = ({ orbitTraces }) => {
    return (
        <>
            {orbitTraces.map((orbitTrace) => (
                <>
                <OrbitTrace xs={orbitTrace.x} ys={orbitTrace.y} zs={orbitTrace.z} color={'grey'} />
                <OrbitAnimation ts={orbitTrace.t} xs={orbitTrace.x} ys={orbitTrace.y} zs={orbitTrace.z} color={'grey'}/>
                </>
            ))}

        </>
    )
}

export default OrbitTraces;