import React from 'react';
import OrbitTrace from './OrbitTrace';
import OrbitAnimation from './OrbitAnimation';
import FOVCone from './FOVCone';

const OrbitTraces = ({ orbitTraces }) => {
    return (
        <>
            {orbitTraces.map((orbitTrace) => (
                <>
                <OrbitTrace xs={orbitTrace.x} ys={orbitTrace.y} zs={orbitTrace.z} color={'grey'} />
                <OrbitAnimation ts={orbitTrace.t} xs={orbitTrace.x} ys={orbitTrace.y} zs={orbitTrace.z} color={'grey'}/>
                <FOVCone ts={orbitTrace.t} xs={orbitTrace.x} ys={orbitTrace.y} zs={orbitTrace.z} 
                h_cone={orbitTrace.h_cone} r_cone={orbitTrace.r_cone} delta_h={orbitTrace.delta_h} color={'cyan'}/>
                </>
            ))}

        </>
    )
}

export default OrbitTraces;