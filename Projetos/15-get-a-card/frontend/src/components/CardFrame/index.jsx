import './style.css'

function CardFrame({id, name, featuredImage, owner}){

    return(
        <article className="card-container">
            <img src={featuredImage} alt="" className='card-image'/>
            <h2 className='card-title'>{name}</h2>
            <small className='card-owner'>{owner}</small>
        </article>
    )
    
}

export default CardFrame;