import { useState, useContext, useRef, useEffect } from 'react';
import './Header.css';
import logo from '../img/CIL.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function Header({ active, onChange }) {
    const navigate = useNavigate();
    const { isAuthenticated, userRole, logout } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для управления меню

    const handleLogin = () => {
        navigate('/authentification');
    };

    const handleAdminPanel = () => {
        navigate('/admin');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Переключаем состояние меню
    };
    const menuRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <img src={logo} alt="Логотип" />
            <div ref={iconRef} className="burger-icon" onClick={toggleMenu}>
                ☰
            </div>
            <nav ref={menuRef} className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <button className={active === 'catalogue' ? 'active' : ''} onClick={() => onChange('catalogue')}>Каталог</button>
                <button className={active === 'cart' ? 'active' : ''} onClick={() => onChange('cart')}>Корзина</button>
                {isAuthenticated ? (
                    <>
                        {userRole === 'admin' && (
                            <button onClick={handleAdminPanel} className={active === 'admin' ? 'active' : ''}>Админ-панель</button>
                        )}
                        <button onClick={logout} className={active === 'logout' ? 'active' : ''}>Выйти</button>
                        <button onClick={() => onChange('pp')} className={active === 'pp' ? 'active' : ''}>Личный кабинет</button>
                    </>
                ) : (
                    <button onClick={handleLogin} className={active === 'authentification' ? 'active' : ''}>Войти</button>
                )}
            </nav>
        </header>
    );
}

export default Header;