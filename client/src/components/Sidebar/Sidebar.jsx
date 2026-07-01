import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth();
  
  // Detecta si la pantalla es menor a 1100px
  const isMobile = useMediaQuery('(max-width:1100px)');

  const menuItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      const requiredRole = ROLE_MAP[item.role];
      return requiredRole === "all" || requiredRole === userRole;
    });
  }, [userRole]);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && handleDrawerToggle) {
      handleDrawerToggle();
    }
  };

  const sidebarContent = (
    <>
      {/* Contenedor flex para alinear logo y X sin que se pisen */}
      <Box className="sidebar-header-container">
        <img
          className="sidebar-header"
          src="/logoSinFondo.png"
          onClick={() => handleNavigation(userRole === 'MEDICO' ? "/app/mi-agenda" : "/app/dashboard")}
          alt="Sweet Medical"
        />
        {/* La X SOLO se renderiza en mobile */}
        {isMobile && (
          <IconButton 
            onClick={handleDrawerToggle} 
            sx={{ color: 'white' }}
            aria-label="close menu"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      
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
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: 'var(--rojo-principal)',
            color: 'white',
            boxSizing: 'border-box'
          }
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box className="sidebar">
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
