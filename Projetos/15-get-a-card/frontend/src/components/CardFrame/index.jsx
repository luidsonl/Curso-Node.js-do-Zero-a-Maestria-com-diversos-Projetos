import { Link } from 'react-router-dom';
import './style.css'
import { ROUTES } from '../../routes/appRoutes';

function CardFrame({id, name, featuredImage, owner}){

    return(
        <article className="card-container">
            <Link to={ROUTES.CARD.replace(':id', id)}>
                <img src={featuredImage} alt="" className='card-image'/>
                <h2 className='card-title'>{name}</h2>
                <small className='card-owner'>{owner}</small>
            </Link>
            
        </article>
    )
    
}

export default CardFrame;