import { Link } from 'react-router-dom';
import '../global.css'
import './style.css'
import { ROUTES } from '../../routes/appRoutes';
import { useAuthContext } from '../../contexts/AuthContext';

function Header(){

    const {user, logout} = useAuthContext();

    return(
        <header>
            <div className='topbar'>
                <nav aria-label="Main Navigation" className='main-navigation'>
                    { user && (
                        <Link className='menu-item' to={ROUTES.DASHBOARD}>Dashboard</Link>
                    )}
                    
                    <Link className='menu-item' to={ROUTES.HOME}>Home</Link>
                </nav>

            
                <nav aria-label="User Navigation" className='user-navigation'>
                    { user && (
                        <>
                            <Link className='menu-item' to={ROUTES.PROFILE}>{user.name.split(' ')[0]}</Link>
                            <span className='menu-item' onClick={logout}>Logout</span>
                        </>
                        
                    )}
                    { !user && (
                        <>
                            <Link className='menu-item' to={ROUTES.LOGIN}>Login</Link>
                            <Link className='menu-item' to={ROUTES.REGISTER}>Logon</Link>
                        </>
                        
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header;