import Button from "./Button"

const ShowStars = ({ title, showStars, onClick }) => {

    return (
        <div className='orbit'>
            <label>{title}</label>
            <br/>
            <Button color={showStars ? 'red' : 'steelblue'} text={showStars ? 'Hide Stars' : 'Show Stars'} onClick={onClick}/>
        </div>
    )
}

export default ShowStars;