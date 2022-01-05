import React from 'react'
import Orbit from './Orbit'

const Orbits = ({orbits, onDelete, onToggle}) => {
    return (
        <>
            {orbits.map((orbit) => (
                <Orbit key={orbit.id} orbit={orbit} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Orbits
