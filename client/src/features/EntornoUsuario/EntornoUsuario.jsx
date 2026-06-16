import { useState, useEffect } from "react";
import { Badge, IconButton, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import UserMenu from "../../components/UserMenu/UserMenu.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import "./EntornoUsuario.css";

const EntornoUsuario = () => {
    const [estadoPerfil, setEstadoPerfil] = useState("LOADING");
    const { signOut, isAuthenticated, isLoading, getAccessToken} = useAuth();
    const [notificationCount] = useState(3); // TODO
    const navigate = useNavigate();
    const location = useLocation();

    console.log("ENTORNO USUARIO (/app)")

    const handleNotificationsClick = () => {
        navigate('/app/notificaciones');
    };

	return (
        <div className="layout-entorno">
            <Sidebar />
            <div className="contenido-principal">
                <header className="entorno-header">
                    <div className="entorno-header-spacer"></div>
                    <IconButton
                      onClick={handleNotificationsClick}
                      className="notifications-button"
                      aria-label="notificaciones"
                    >
                    </IconButton>
                    <UserMenu notificationCount={notificationCount} />
                </header>

                <main className="entorno-main-content">
                    <Outlet />
                </main>
           </div>
        </div>
  );
};

export default EntornoUsuario;
