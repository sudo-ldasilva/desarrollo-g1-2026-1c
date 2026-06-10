import { createTheme, ThemeProvider } from '@mui/material';
import { LogtoProvider } from '@logto/react';
import EntornoUsuario from "./features/entornoUsuario/EntornoUsuario.jsx";
import Dashboard from "./features/dashboard/Dashboard.jsx";
import MisTurnos from "./features/MisTurnos/MisTurnos.jsx";
import Notificaciones from "./features/Notificaciones/Notificaciones.jsx";
import { BrowserRouter, Routes, Route, Navigate, useOutletContext } from 'react-router-dom';
import Callback from './components/Callback.jsx';
import Home from './features/Home.jsx';
import SolicitarTurnos from './features/SolicitarTurnos/SolicitarTurnos.jsx';
import CarritoPreseleccion from './features/CarritoPreseleccion/CarritoPreseleccion.jsx';
import axios from 'axios';
import React, {useState} from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c90e31'
        }
    },
    typography: {
        fontFamily: "'Poppins', sans-serif"
    }
});

// Componente wrapper para Dashboard que obtiene el contexto del Outlet
const DashboardWrapper = () => {
    const { turnosPreseleccionados, confirmarReserva } = useOutletContext();
    return <Dashboard turnosPreseleccionados={turnosPreseleccionados} confirmarReserva={confirmarReserva} />;
};

function App() {
    const config = {
        endpoint: 'https://mm32is.logto.app/',
        appId: 'o5yyg82jt0gb2b8nbiuje',
        redirectUri: `${window.location.origin}/callback`,
        postLogoutRedirectUri: `${window.location.origin}/`,
    };

    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (turno) => {
        setCarrito((prev) => [...prev, turno]);
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter(t => t._id !== id && t.id !== id));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const persistirReservasEnBackend = async (turnosElegidos) => {
        const ids = turnosElegidos.map(t => t._id || t.id);
        //REVISAR
        //ACÁ falta resolver como reservamos todos los turnos preseleccionados
        await axios.post('http://localhost:3000/turnos/{t.id}/cambios-estado', { turnos: ids });
    };

    return (
        <LogtoProvider config={config}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/callback" element={<Callback />} />
                        
                        {/* Rutas anidadas bajo /app - todas comparten el layout de EntornoUsuario */}
                        <Route path="/app" element={<EntornoUsuario />}>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<DashboardWrapper />} />
                            <Route path="mis-turnos" element={<MisTurnos />} />
                            <Route path="notificaciones" element={<Notificaciones />} />
                            {/* Acá podés agregar más rutas en el futuro */}
                        </Route>
                        
                        {/* Rutas fuera del entorno de usuario (sin Sidebar) */}
                        <Route path="/solicitar-turnos"
                            element={<SolicitarTurnos agregarAlCarrito={agregarAlCarrito} carrito={carrito} />}/>
                        <Route path="/solicitar-turnos/carrito"
                            element={
                                <CarritoPreseleccion
                                    carrito={carrito}
                                    eliminarDelCarrito={eliminarDelCarrito}
                                    limpiarCarrito={limpiarCarrito}
                                    persistirReservasEnBackend={persistirReservasEnBackend}/>
                            } />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </LogtoProvider>
    );
}

export default App;
