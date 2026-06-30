import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../../components/UserMenu/UserMenu.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import LoadingSplash from "../../components/LoadingSplash/LoadingSplash.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { obtenerNotificaciones } from "../../services/NotificacionesService.jsx";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./EntornoUsuario.css";

const EntornoUsuario = ({header}) => {
    const { getAccessToken, isSigningOut } = useAuth();
    const [notificationCount, setNotificationCount] = useState(0);

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    useEffect(() => {
        //Extraer la logica a una funcion reutilizable
        const cargarCantidadNotificaciones = async () => {
            try {
                const token = await getAccessToken(process.env.REACT_APP_LOGTO_RESOURCES);
                if (!token) return;
                const data = await obtenerNotificaciones(token, "pendientes", 1, 1);
                setNotificationCount(data.total ?? 0);
            } catch {
                // count queda en 0
            }
        };

        cargarCantidadNotificaciones();
    }, [getAccessToken]);

    useEffect(() => {}, [header]);

    //Crear la funcion para decrementar el contador localmente (evita un request extra)
    const decrementarContador = () => {
        setNotificationCount((prev) => Math.max(0, prev - 1));
    };

    return (
        <>
            {isSigningOut && <LoadingSplash message="Cerrando sesión..." />}
            <div className="layout-entorno">
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <div className="contenido-principal">
                    <header className="entorno-header">
                        <IconButton className="hamburger-btn" onClick={handleDrawerToggle} edge="start">
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <h2 className="EntornoUsuario_info-title">{header.titulo}</h2>
                            <p className="EntornoUsuario_info-subtitle">{header.descripcion}</p>
                        </div>

                        <UserMenu className="EntornoUsuario_usuario" notificationCount={notificationCount} />
                    </header>
                    <main className="entorno-main-content">
                        {/*Pasar la funcion por context para que los hijos puedan usarla */}
                        <Outlet context={{ decrementarContador }} />
                    </main>
                </div>
            </div>
        </>
    );
};


export default EntornoUsuario;
