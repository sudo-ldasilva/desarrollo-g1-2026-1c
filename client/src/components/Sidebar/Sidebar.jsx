import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge, IconButton, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../../hooks/useAuth.jsx';
import './Sidebar.css';

const ROLE_MAP = {
  patient: "PACIENTE",
  doctor: "MEDICO",
  all: "all",
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth();

  const allMenuItems = [
    { text: 'Inicio', path: '/app/dashboard', role: 'patient' },
    { text: 'Mis Turnos', path: '/app/mis-turnos', role: 'patient' },
    { text: 'Mi Agenda', path: '/app/mi-agenda', role: 'doctor' },
    { text: 'Solicitar turnos', path: '/app/solicitar-turnos', role: 'patient' },
    { text: 'Mis disponibilidades', path: '/app/mis-disponibilidades', role: 'doctor' },
    { text: 'Mis servicios', path: '/app/mis-servicios', role: 'doctor' },
    { text: 'Mis sedes', path: '/app/mis-sedes', role: 'doctor' },
  ];

  const menuItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      const requiredRole = ROLE_MAP[item.role];
      return requiredRole === "all" || requiredRole === userRole;
    });
  }, [userRole]);

  const handleNavigation = (path) => {
    // Preparado para navegación futura
    navigate(path);
  };

  return (
    <Box className="sidebar">
      <img
        className="sidebar-header"
        src="/logoSinFondo.png"
        onClick={() => handleNavigation("dashboard")}
        alt="Sweet Medical"
      ></img>

      <List className="sidebar-menu">
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <ListItemText
                primary={
                  <Box className="menu-item-text">
                    {item.text}
                    {item.subtext && (
                      <span className="menu-item-subtext">{item.subtext}</span>
                    )}
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );
};

export default Sidebar;
