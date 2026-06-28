import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAuth } from '../../hooks/useAuth.jsx';
import './Sidebar.css';

const ROLE_MAP = {
  patient: "PACIENTE",
  doctor: "MEDICO",
  all: "all",
};

const allMenuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/app/dashboard', role: 'patient' },
    { text: 'Mis Turnos', icon: <FavoriteIcon />, path: '/app/mis-turnos', role: 'patient' },
    { text: 'Mi Agenda', icon: <CalendarMonthIcon />, path: '/app/mi-agenda', role: 'doctor' },
    { text: 'Solicitar turno', icon: <MedicalServicesIcon />, path: '/app/solicitar-turnos', role: 'patient' },
    { text: 'Mis disponibilidades', icon: <ScheduleIcon />, path: '/app/mis-disponibilidades', role: 'doctor' },
    { text: 'Mis servicios', icon: <MedicalInformationIcon />, path: '/app/mis-servicios', role: 'doctor' },
    { text: 'Mis sedes', icon: <LocationOnIcon />, path: '/app/mis-sedes', role: 'doctor' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth();

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
              <ListItemIcon className="sidebar-menu-icon">
                {item.icon}
              </ListItemIcon>
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
