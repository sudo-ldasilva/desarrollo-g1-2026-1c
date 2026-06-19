import { createTheme, ThemeProvider } from '@mui/material';
import { LogtoProvider } from '@logto/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EntornoUsuario from "./features/EntornoUsuario/EntornoUsuario.jsx";
import Dashboard from "./features/Dashboard/Dashboard.jsx";
import MisTurnos from "./features/MisTurnos/MisTurnos.jsx";
import Notificaciones from "./features/Notificaciones/Notificaciones.jsx";
import { BrowserRouter, Routes, Route, Navigate, useOutletContext, useLocation } from 'react-router-dom';
import Callback from './components/Callback.jsx';
import Home from './features/Home.jsx';
import SolicitarTurnos from './features/SolicitarTurnos/SolicitarTurnos.jsx';
import ResultadoBusqueda from './features/SolicitarTurnos/ResultadoBusqueda.jsx';
import CompletarPerfil from './features/CompletarPerfil/CompletarPerfil.jsx';
import RequiereAuth from './components/RequiereAuth.jsx';
import RequireRole from './components/RequireRole.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import MisServicios from './features/MisServicios/MisServicios.jsx';
import MisSedes from './features/MisSedes/MisSedes.jsx';
import MisDatos from './features/MisDatos/MisDatos.jsx';

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

const TITLES = {
    "/": "Inicio",
    "/callback": "Iniciando sesión",
    "/completar-perfil": "Completar perfil",
    "/app": "Inicio",
    "/app/": "Inicio",
    "/app/dashboard": "Inicio",
    "/app/solicitar-turnos": "Solicitar turnos",
    "/app/solicitar-turnos/resultado": "Resultado de búsqueda",
    "/app/mis-turnos": "Mis turnos",
    "/app/mis-servicios": "Mis servicios",
    "/app/mis-sedes": "Mis sedes",
    "/app/notificaciones": "Notificaciones",
    "/app/mi-agenda": "Mi agenda",
    "/app/mis-disponibilidades": "Mis disponibilidades",
    "/app/mis-datos": "Mis datos",
};

function TitleUpdater() {
    const location = useLocation();

    useEffect(() => {
        const title = TITLES[location.pathname] || "Sweet Medical";
        document.title = `${title} - Sweet Medical`;
    }, [location]);

    return null;
}

function App() {
  return (
      <LogtoProvider config={logtoConfig}>
        <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <TitleUpdater />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/completar-perfil" element={<CompletarPerfil />} />

              <Route path="/app" element={<RequiereAuth><EntornoUsuario /></RequiereAuth>} >

                <Route
                  path="solicitar-turnos"
                  element={
                    <RequireRole roles={["PACIENTE"]}>
                      <SolicitarTurnos />
                    </RequireRole>
                  }
                />

                <Route
                  path="mis-turnos"
                  element={
                    <RequireRole roles={["PACIENTE"]}>
                      <MisTurnos/>
                    </RequireRole>
                  }
                />

                <Route
                  path="solicitar-turnos/resultado"
                  element={
                    <RequireRole roles={["PACIENTE"]}>
                      <ResultadoBusqueda/>
                    </RequireRole>
                  }
                />

                <Route path='mis-servicios' element={<RequireRole roles={["MEDICO"]}><MisServicios/></RequireRole>} />
                <Route index element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='mis-sedes' element={<RequireRole roles={["MEDICO"]}><MisSedes/></RequireRole>} />
                <Route path='notificaciones' element={<Notificaciones/>} />
                <Route path='mi-agenda' element={<RequireRole roles={["MEDICO"]}><div>Falta hacer :)</div></RequireRole>} />
                <Route path='mis-disponibilidades' element={<RequireRole roles={["MEDICO"]}><div>Falta hacer :)</div></RequireRole>} />
                <Route path='mis-datos' element={<MisDatos/>} />
              </Route>
            </Routes>
          </ThemeProvider>
         </BrowserRouter>
        </AuthProvider>
      </LogtoProvider>
  );

}

export default App;
