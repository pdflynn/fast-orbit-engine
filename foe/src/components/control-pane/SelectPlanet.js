import React from 'react';
import {FaAdjust} from 'react-icons/fa';

const SelectPlanet = ({currentPlanet, planets, onClick}) => {

    return (
        <div className='orbit'>
            <h3>
                Current Planet: {currentPlanet.name}
            </h3>
            <FaAdjust onClick={() => onClick(0)}/>
            &nbsp;
            <FaAdjust onClick={() => onClick(1)}/>
        </div>
    )
}

export default SelectPlanet;