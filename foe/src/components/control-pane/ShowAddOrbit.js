import Button from "./Button"

const ShowAddOrbit = ({ title, onAdd, showAdd }) => {

    return (
        <div className='orbit'>
            <label>{title}</label>
            <br/>
            <Button color={showAdd ? 'white' : 'steelblue'} text={showAdd ? 'Double Click to Close' : 'Add Orbit'} onClick={onAdd}/>
        </div>
    )
}

export default ShowAddOrbit;