import React from 'react'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const SimulationTime = ({ updateTime }) => {
    const [simTimeMult, setTimeMult] = useState('1000');

    const onSubmit = (e) => {
        e.preventDefault()

        updateTime({ simTimeMult });
        setTimeMult(simTimeMult)
    }


    return (
        <form className='simTimeForm' onSubmit={onSubmit}>
            <div className='orbit'>
                <label>Simulation Time (sec/sec)</label>
                <div>
                    <input type='submit' value="<<" onClick={() => setTimeMult(simTimeMult / 10)}/>
                    <input type='submit' value="<" onClick={() => setTimeMult(simTimeMult / 2)}/>
                    <input type='text' placeholder='e.g. 100' value={simTimeMult} 
                    onChange={(e) => setTimeMult(e.target.value)}
                    style={{width: '25%',
                            margin: '0px', padding: '0px'}}
                    />
                    <input type='submit' value=">" onClick={() => setTimeMult(simTimeMult * 2)}/>
                    <input type='submit' value=">>" onClick={() => setTimeMult(simTimeMult * 10)}/>
                    <input type='submit' value="Pause" onClick={() => setTimeMult(0)}/>
                </div>
            </div>
        </form>
    )
}

export default SimulationTime
