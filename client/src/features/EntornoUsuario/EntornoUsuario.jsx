import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../../components/UserMenu/UserMenu.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { obtenerNotificaciones } from "../../services/NotificacionesService.jsx";
import "./EntornoUsuario.css";

const EntornoUsuario = () => {
    const { getAccessToken } = useAuth();
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessToken(process.env.REACT_APP_LOGTO_RESOURCES);
                if (!token) return;
                const data = await obtenerNotificaciones(token, "pendientes", 1, 1);
                setNotificationCount(data.total ?? 0);
            } catch {
                // count queda en 0
            }
        })();
    }, [getAccessToken]);

	return (
        <div className="layout-entorno">
            <Sidebar />
            <div className="contenido-principal">
                <header className="entorno-header">
                    <div className="entorno-header-spacer"></div>
                    <UserMenu className="EntornoUsuario_usuario" notificationCount={notificationCount} />
                </header>

                <main className="entorno-main-content">
                    <Outlet />
                </main>
           </div>
        </div>
  );
};

export default EntornoUsuario;
