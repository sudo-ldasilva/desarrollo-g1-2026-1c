import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogto } from '@logto/react';
import './UserMenu.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUsername] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { signOut, getIdTokenClaims, isAuthenticated } = useLogto();

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut(`${window.location.origin}`);
  };

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  // Fallback para el nombre de usuario si Logto aún no lo cargó
  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUsername(claims.username);
      }
    })();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        className="user-menu-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <i className="fa-solid fa-circle-user"></i>
        <span className="user-name">{userName}</span>
        <i className={`fa-solid fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="dropdown-header">
            <span className="dropdown-user-name">{userName}</span>
          </div>
          
          <ul className="dropdown-items">
            <li>
              <button onClick={() => handleNavigate('/app/mis-datos')}>
                <i className="fa-solid fa-user"></i>
                <span>Mi Perfil</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate('/app/notificaciones')}>
                <i className="fa-solid fa-bell"></i>
                <span>Notificaciones</span>
              </button>
            </li>
            <li className="divider"></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
