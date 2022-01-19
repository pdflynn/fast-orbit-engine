import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Orbit = ({orbit, onDelete, onToggle}) => {
    return (
        <div className='orbit' onClick={(onToggle)}>
            <h3>
                {orbit.text}
                <FaTimes onClick={() => onDelete(orbit.id)}
                style={{color: 'white', cursor: 'pointer',
                float: 'right'}}/>
            </h3>
            <p className='math'>a = {orbit.sma} (km)</p>
            <p className='math'>e = {orbit.ecc}</p>
            <p className='math'>i = {orbit.inc} (deg)</p>
            <p className='math'>&Omega; = {orbit.raan} (deg)</p>
            <p className='math'>&omega; = {orbit.argp} (deg)</p>
            <p className='math'>&theta; = {orbit.tra} (deg)</p>
        </div>
    )
}

export default Orbit
