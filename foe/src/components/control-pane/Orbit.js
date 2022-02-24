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
            <table className='math'>
                <tr>
                    <td>a = {orbit.sma} (km)</td>
                    <td>e = {orbit.ecc} </td>
                </tr>
                <tr>
                    <td>i = {orbit.inc} (deg)</td>
                    <td>&Omega; = {orbit.raan} (deg)</td>
                </tr>
                <tr>
                    <td>&omega; = {orbit.argp} (deg)</td>
                    <td>&theta; = {orbit.tra} (deg)</td>
                </tr>
            </table>

        </div>
    )
}

export default Orbit
