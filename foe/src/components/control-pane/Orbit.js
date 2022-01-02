import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Orbit = ({orbit, onDelete}) => {
    return (
        <div className='orbit'>
            <h3>
                {orbit.text}
                <FaTimes onClick={() => onDelete(orbit.id)}
                style={{color: 'darkred', cursor: 'pointer',
                float: 'right'}}/>
            </h3>
            <p className='math'>a = {orbit.semiMajorAxis} (km)</p>
            <p className='math'>e = {orbit.eccentricity}</p>
            <p className='math'>i = {orbit.inclination} (deg)</p>
            <p className='math'>&Omega; = {orbit.rightAscension} (deg)</p>
            <p className='math'>&omega; = {orbit.argPeriapse} (deg)</p>
            <p className='math'>&theta; = {orbit.trueAnomaly} (deg)</p>
        </div>
    )
}

export default Orbit
