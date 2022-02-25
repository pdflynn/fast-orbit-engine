import React from "react";
import { useState } from 'react';

const AddOrbit = ({ onAdd, onClose}) => {
    const [text, setText] = useState(''); // name
    const [sma, setSma] = useState('');   // semi-major axis
    const [ecc, setEcc] = useState('');   // eccentricity
    const [inc, setInc] = useState('');   // inclination
    const [raan, setRaan] = useState(''); // right ascension of the ascending node
    const [argp, setArgp] = useState(''); // argument of pariapse
    const [tra, setTra] = useState('');   // true anomaly at epoch

    const onSubmit = (e) => {
        e.preventDefault();

        // Primitive error handling
        if (!sma) {
            alert('Please enter a semi-major axis');
            return;
        }
        if (!ecc) {
            alert('Please enter an eccentricity');
            return;
        }
        if (!inc) {
            alert('Please enter an inclination');
            return;
        }
        if (!raan) {
            alert('Please enter a right ascension of the ascending node');
            return;
        }
        if (!argp) {
            alert('Please enter an argument of periapse');
            return;
        }
        if (!tra) {
            alert('Please enter the true anomaly at epoch');
            return;
        }

        onAdd({ text, sma, ecc, inc, raan, argp, tra });
        setText('');
        setSma('');
        setEcc('');
        setInc('');
        setRaan('');
        setArgp('');
        setTra('');
    }

        return (
            <div className='greyed-out' onDoubleClick={onClose}>
                <form className='orbit-form' onSubmit={onSubmit}>
                <div className='orbit'>
                        <label>Name (optional)</label>
                        <br/>
                        <input type='text' placeholder='e.g. Molniya' value={text} onChange={(e) => setText(e.target.value)}/>
                    </div>
                    <div className='orbit'>
                        <label>Semi-major axis (in km)</label>
                        <br/>
                        <input type='number' placeholder='e.g. 36000' value={sma} onChange={(e) => setSma(e.target.value)}/>
                    </div>
                    <div className='orbit'>
                        <label>Eccentricity (value 0-1)</label>
                        <br/>
                        <input type='number' placeholder='e.g. 0' value={ecc} onChange={(e) => setEcc(e.target.value)}/>
                    </div>
                    <div className='orbit'>
                        <label>Inclination (in deg)</label>
                        <br/>
                        <input type='number' placeholder='e.g. 90' value={inc} onChange={(e) => setInc(e.target.value)}/>
                    </div>
                    <div className='orbit'>
                        <label>Right Ascension of the Ascending Node (deg)</label>
                        <br/>
                        <input type='number' placeholder='e.g. 30' value={raan} onChange={(e) => setRaan(e.target.value)}/>
                    </div>
                    <div className='orbit'>
                        <label>Argument of Periapse</label>
                        <br/>
                        <input type='number' placeholder='e.g. 0' value={argp} onChange={(e) => setArgp(e.target.value)}/>
                    </div>
                    <div className='orbit'>
                        <label>True Anomaly at epoch (in deg)</label>
                        <br/>
                        <input type='number' placeholder='e.g. 0' value={tra} onChange={(e) => setTra(e.target.value)}/>
                    </div>
                    <div className='orbit'><input type='submit' className='' value='Save'/></div>
                    
                </form>
            </div>
        )
    }

    export default AddOrbit;