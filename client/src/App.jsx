import { createTheme, ThemeProvider } from '@mui/material';
import { LogtoProvider } from '@logto/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EntornoUsuario from "./features/EntornoUsuario/EntornoUsuario.jsx";
import Dashboard from "./features/Dashboard/Dashboard.jsx";
import MisTurnos from "./features/MisTurnos/MisTurnos.jsx";
import Notificaciones from "./features/Notificaciones/Notificaciones.jsx";
import { BrowserRouter, Routes, Route, Navigate, useOutletContext } from 'react-router-dom';
import Callback from './components/Callback.jsx';
import Home from './features/Home.jsx';
import SolicitarTurnos from './features/SolicitarTurnos/SolicitarTurnos.jsx';
import CarritoPreseleccion from './features/CarritoPreseleccion/CarritoPreseleccion.jsx';
import CompletarPerfil from './features/CompletarPerfil/CompletarPerfil.jsx';
import RequiereAuth from './components/RequiereAuth.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import MisServicios from './features/MisServicios/MisServicios.jsx';
import MisSedes from './features/MisSedes/MisSedes.jsx';

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

const logtoConfig = {
    endpoint: process.env.REACT_APP_LOGTO_ENDPOINT,
    appId: process.env.REACT_APP_LOGTO_APP_ID,
    redirectUri: `${window.location.origin}/callback`,
    postLogoutRedirectUri: window.location.origin,
    resources: process.env.REACT_APP_LOGTO_RESOURCES
        ? [process.env.REACT_APP_LOGTO_RESOURCES]
        : [],
};

function App() {
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

    // TODO Des-hardcodear
    const [turnos, setTurnos] = useState([
        {
            _id: "t1",
            fechaHora: "2026-06-15T14:30:00Z", // Fecha futura (configurable para cancelación)
            medico: { nombre: "Gómez", matricula: "12345" },
            sede: { nombre: "Palermo" },
            servicio: {nombre: "Electrocardiograma de reposo"},
            estado: "RESERVADO",
            costo: 0
        },
        {
            _id: "t2",
            fechaHora: "2026-05-10T10:00:00Z", // Fecha pasada (No se puede cancelar por tiempo)
            medico: { nombre: "Fernández", matricula: "67890" },
            sede: { nombre: "Flores" },
            servicio: {nombre: "Consulta Médica General"},
            estado: "REALIZADO",
            costo: 2500
        }
    ]);

  return (
      <LogtoProvider config={logtoConfig}>
        <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/completar-perfil" element={<CompletarPerfil />} />

              <Route path="/app" element={<RequiereAuth><EntornoUsuario /></RequiereAuth>} >

                <Route
                  path="solicitar-turnos"
                  element={
                      <SolicitarTurnos
                        carrito={carrito}
                        agregarAlCarrito={agregarAlCarrito}
                      />
                  }
                />

                <Route
                  path="mis-turnos"
                  element={
                      <MisTurnos
                        turnos={turnos}
                      />
                  }
                />

                <Route
                  path="solicitar-turnos/carrito"
                  element={
                      <CarritoPreseleccion
                        carrito={carrito}
                      />
                  }
                />
                <Route path='mis-servicios' element={<MisServicios/>} />
                <Route index element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='mis-sedes' element={<MisSedes/>} />
                <Route path='notificaciones' element={<Notificaciones/>} />
                <Route path='mi-agenda' element={<div>Falta hacer :)</div>} />
                <Route path='mis-disponibilidades' element={<div>Falta hacer :)</div>} />
                <Route path='mis-datos' element={<div>Falta hacer :)</div>} />
              </Route>
            </Routes>
          </ThemeProvider>
         </BrowserRouter>
        </AuthProvider>
      </LogtoProvider>
  );

}

export default App;
