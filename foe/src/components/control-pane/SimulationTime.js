import React from 'react'
import { useState } from 'react'

const SimulationTime = ({ updateTime }) => {
    const [simTimeMult, setTimeMult] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()

        updateTime({ simTimeMult });
        setTimeMult('')
    }


    return (
        <form className='simTimeForm' onSubmit={onSubmit}>
            <div className='orbit'>
                <label>Simulation Time</label>
                <input type='text' placeholder='e.g. 1000' value={simTimeMult} 
                onChange={(e) => setTimeMult(e.target.value)}
                style={{width: '25%', position: 'relative', left: '15%',
                        margin: '0px', padding: '0px'}}
                />
            </div>
        </form>
    )
}

export default SimulationTime
