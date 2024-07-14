import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ title, linkTo }) {
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        userCtx.logout();
        navigate('/login');
    };

    return (
        <nav className='navbar'>
            <div className='logout'>
                <h1>{title}</h1>
                {linkTo === 'logout' ? <a href="/" onClick={handleLogout}>Logout</a> : null}
            </div>
        </nav>
    );
}
