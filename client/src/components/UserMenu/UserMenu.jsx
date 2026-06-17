import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { Badge } from '@mui/material';
import './UserMenu.css';

const UserMenu = ({notificationCount, className}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUsername] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { signOut, getIdTokenClaims, isAuthenticated } = useAuth();

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
      try {
        if (isAuthenticated) {
          const claims = await getIdTokenClaims();
          if (claims) {
            setUsername(claims.username);
          }
        }
      } catch (error) {
        console.error("Error al obtener claims del usuario:", error);
      }
    })();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <div className={"user-menu-container " + className} ref={menuRef}>
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
      {
          isOpen ? (
                <i className="fa-solid fa-circle-user"></i>
          ) : (
              <Badge
              badgeContent={notificationCount}
              className="notifications-badge"
              color="info"
              >
              <i className="fa-solid fa-circle-user"></i>
              </Badge>
          )
      }
        <span className="user-name">{userName}</span>
        <i className={`fa-solid fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <ul className="dropdown-items">
            <li>
              <button type="button" onClick={() => handleNavigate('/app/mis-datos')}>
                <i className="fa-solid fa-user"></i>
                <span>Mi Perfil</span>
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNavigate('/app/notificaciones')}>
                  <Badge
                      badgeContent={notificationCount}
                      color="info"
                      className="notifications-badge notifications-badge-inside"
                  >
                        <i className="fa-solid fa-bell"></i>
          </Badge>
          <span>Notificaciones</span>
              </button>
            </li>
            <li className="divider"></li>
            <li>
              <button type="button" onClick={handleLogout} className="logout-btn">
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
