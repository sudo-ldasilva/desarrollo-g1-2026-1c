import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge, IconButton, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationCount] = useState(3);
  const [userName] = useState('Juan Pérez');

  const menuItems = [
    { text: 'Dashboard', path: '/app/dashboard', role: 'all' },
    { text: 'Mis Turnos', subtext: '(paciente)', path: '/app/mis-turnos', role: 'patient' },
    { text: 'Mi Agenda', subtext: '(médico)', path: '/app/mi-agenda', role: 'doctor' },
    { text: 'Solicitar turnos', subtext: '(paciente)', path: '/app/solicitar-turnos', role: 'patient' },
    { text: 'Mis disponibilidades', subtext: '(médico)', path: '/app/mis-disponibilidades', role: 'doctor' },
    { text: 'Mis servicios', subtext: '(médico)', path: '/app/mis-servicios', role: 'doctor' },
    { text: 'Mis sedes', subtext: '(médico)', path: '/app/mis-sedes', role: 'doctor' },
  ];

  const handleNavigation = (path) => {
    // Preparado para navegación futura
    navigate(path);
  };

  const handleNotificationsClick = () => {
    navigate('/app/notificaciones');
  };

  return (
    <Box className="sidebar">
      <Box className="sidebar-header">
        <Typography variant="h6" className="sidebar-logo">
          Sweet Medical
        </Typography>
      </Box>

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

      <Box className="sidebar-footer">
        <Box className="notifications-container">
          <IconButton
            onClick={handleNotificationsClick}
            className="notifications-button"
            aria-label="notificaciones"
          >
            <Badge
              badgeContent={notificationCount}
              color="error"
              className="notifications-badge"
            >
              <i className="fa-solid fa-bell fa-bell-side"></i>
            </Badge>
          </IconButton>
        </Box>

        <Box className="user-greeting">
          <Typography variant="body2">
            ¡Hola, <strong>{userName}</strong>!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
