import { Link } from 'react-router-dom';
import '../global.css'
import './style.css'
import { ROUTES } from '../../routes/appRoutes';

function Header(){

    return(
        <header>
            <nav aria-label="Main Navigation" className='main-navigation'>

                <Link className='link' to={ROUTES.DASHBOARD}>Dashboard</Link>
                <Link className='link' to={ROUTES.HOME}>Home</Link>
            </nav>

            <nav aria-label="User Navigation" className='user-navigation'>
                <Link className='link' to={ROUTES.PROFILE}>Profile</Link>
                <Link className='link' to={ROUTES.DASHBOARD}>Logout</Link>
            </nav>
        </header>
    )
}

export default Header;