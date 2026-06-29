import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import axios from 'axios';
import './UserMenu.css';
import { useLogto } from '@logto/react';

const UserMenu = ({ notificationCount, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUsername] = useState('');

  const [userRole, setUserRole] = useState(null);
  const [medicoData, setMedicoData] = useState(null);

  const menuRef = useRef(null);
  const displayName = medicoData?.nombre || userName; 

  const navigate = useNavigate();

  const { getAccessToken, signOut, getIdTokenClaims, isAuthenticated, isLoading } = useLogto();

  const effectRan = useRef(false);
  const getTokenRef = useRef(getAccessToken);
  getTokenRef.current = getAccessToken;

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


  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    const obtenerNombreLogto = async () => {
      try {
        const claims = await getIdTokenClaims();
        if (claims) {
          setUsername(claims.username || claims.preferred_username || 'Usuario');
        }
      } catch (error) {
        console.error("Error al obtener el nombre de Logto:", error);
      }
    };

    obtenerNombreLogto();
  }, [isAuthenticated, isLoading, getIdTokenClaims]);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    if (effectRan.current) return;
    effectRan.current = true;

    const cargarDatosDeSesion = async () => {
      try {
        const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);
        const headers = { Authorization: `Bearer ${token}` };


        const resMe = await axios.get(`${process.env.REACT_APP_API_URL}/me`, { headers });

        const rolUsuario = resMe.data.rol;
        setUserRole(rolUsuario);


        if (rolUsuario === 'MEDICO') {
          const idMedico = resMe.data.idMedico;

          if (idMedico) {
            const resMedico = await axios.get(`${process.env.REACT_APP_API_URL}/medicos/${idMedico}`, { headers });


            if (resMedico.data) {
              setMedicoData(resMedico.data);
            }
          }
        }
      } catch (error) {
        console.error("Error al sincronizar el menú de usuario con el backend:", error);
      }
    };

    cargarDatosDeSesion();
  }, [isAuthenticated, isLoading]);

  return (
    <div className={"user-menu-container " + className} ref={menuRef}>
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isOpen ? (
          <i className="fa-solid fa-circle-user"></i>
        ) : (
          <Badge
            badgeContent={notificationCount}
            className="notifications-badge"
            color="info"
          >
            <i className="fa-solid fa-circle-user"></i>
          </Badge>
        )}

        <span className="user-name">{displayName}</span>
        <i className={`fa-solid fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <ul className="dropdown-items">


            {userRole === 'PACIENTE' && (
              <li>
                <button type="button" onClick={() => handleNavigate('/app/mis-datos')}>
                  <i className="fa-solid fa-user"></i>
                  <span>Mi Perfil</span>
                </button>
              </li>
            )}


            {userRole === 'MEDICO' && (
              <li className="dropdown-medico-info">
                <div className="medico-profile-box">
                  <span className="medico-name">
                    {medicoData?.nombre || userName}
                  </span>
                  <span className="medico-matricula">
                    M.P.: {medicoData?.matricula || 'Cargando...'}
                  </span>
                </div>
              </li>
            )}

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
