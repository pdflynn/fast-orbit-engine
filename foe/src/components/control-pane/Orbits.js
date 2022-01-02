import React from 'react'
import Orbit from './Orbit'

const Orbits = ({orbits, onDelete}) => {
    return (
        <>
            {orbits.map((orbit) => (
                <Orbit key={orbit.id} orbit={orbit} onDelete={onDelete}/>
            ))}
        </>
    )
}

export default Orbits
