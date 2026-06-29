import { createTheme, ThemeProvider } from '@mui/material';
import { LogtoProvider } from '@logto/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EntornoUsuario from "./features/EntornoUsuario/EntornoUsuario.jsx";
import Dashboard from "./features/Dashboard/Dashboard.jsx";
import MisTurnos from "./features/MisTurnos/MisTurnos.jsx";
import Notificaciones from "./features/Notificaciones/Notificaciones.jsx";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Callback from './components/Callback.jsx';
import Home from './features/Home.jsx';
import SolicitarTurnos from './features/SolicitarTurnos/SolicitarTurnos.jsx';
import ResultadoBusqueda from './features/SolicitarTurnos/ResultadoBusqueda.jsx';
import CompletarPerfil from './features/CompletarPerfil/CompletarPerfil.jsx';
import RequiereAuth from './components/RequiereAuth.jsx';
import RequireRole from './components/RequireRole.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import React, {useState, useEffect} from 'react';
import MisServicios from './features/MisServicios/MisServicios.jsx';
import MisSedes from './features/MisSedes/MisSedes.jsx';
import MisDatos from './features/MisDatos/MisDatos.jsx';
import MiAgenda from './features/MiAgenda/MiAgenda.jsx';

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
    "/":                               { titulo: "Inicio"               , desc: "" },
    "/callback":                       { titulo: "Iniciando sesión     ", desc: "" },
    "/completar-perfil":               { titulo: "Completar perfil"     , desc: "" },
    "/app":                            { titulo: "Inicio"               , desc: "" },
    "/app/":                           { titulo: "Inicio"               , desc: "" },
    "/app/dashboard":                  { titulo: "Inicio"               , desc: "Una vista rápida del estado general de tus turnos." },
    "/app/solicitar-turnos":           { titulo: "Solicitar turnos"     , desc: "Completá los filtros y buscá disponibilidad." },
    "/app/solicitar-turnos/resultado": { titulo: "Resultado de búsqueda", desc: "Ver los turnos disponibles." },
    "/app/mis-turnos":                 { titulo: "Mis turnos"           , desc: "Consultar los turnos del usuario." },
    "/app/mis-servicios":              { titulo: "Mis servicios"        , desc: "Configurá las especialidades y prácticas que realizás en Sweet Medical." },
    "/app/mis-sedes":                  { titulo: "Mis sedes"            , desc: "Asigná o remové los centros médicos y clínicas donde prestás servicios presenciales." },
    "/app/notificaciones":             { titulo: "Notificaciones"       , desc: "Ver las notificaciones." },
    "/app/mi-agenda":                  { titulo: "Mi agenda"            , desc: "Ver mi agenda." },
    "/app/mis-disponibilidades":       { titulo: "Mis disponibilidades" , desc: "Ver mis disponibilidades horarias." },
    "/app/mis-datos":                  { titulo: "Mis datos"            , desc: "Ver la credencial con mis datos." },
};

function TitleUpdater({setHeader}) {
    const location = useLocation();

    useEffect(() => {
        const header = TITLES[location.pathname] || { titulo: "Sweet Medical", desc: "" };
        document.title = `${header.titulo} - Sweet Medical`;

        setHeader({
            titulo: header.titulo,
            descripcion: header.desc
        });
    }, [location, setHeader]);

    return null;
}

function App() {
    const [header, setHeader] = useState({
        titulo: "",
        descripcion: ""
    })

  return (
      <LogtoProvider config={logtoConfig}>
        <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <TitleUpdater setHeader={setHeader} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/completar-perfil" element={<CompletarPerfil />} />

              <Route path="/app" element={<RequiereAuth><EntornoUsuario header={header} /></RequiereAuth>} >

                <Route
                  path="solicitar-turnos"
                  element={
                    <RequireRole roles={["PACIENTE"]}>
                      <SolicitarTurnos setHeader={setHeader} />
                    </RequireRole>
                  }
                />

                <Route
                  path="mis-turnos"
                  element={
                    <RequireRole roles={["PACIENTE"]}>
                      <MisTurnos setHeader={setHeader} />
                    </RequireRole>
                  }
                />

                <Route
                  path="solicitar-turnos/resultado"
                  element={
                    <RequireRole roles={["PACIENTE"]}>
                      <ResultadoBusqueda setHeader={setHeader} />
                    </RequireRole>
                  }
                />

                <Route path='mis-servicios' element={<RequireRole roles={["MEDICO"]}><MisServicios setHeader={setHeader} /></RequireRole>} />
                <Route path='dashboard' element={<RequireRole roles={["PACIENTE"]}><Dashboard  setHeader={setHeader} /></RequireRole>} />
                <Route path='mis-sedes' element={<RequireRole roles={["MEDICO"]}><MisSedes setHeader={setHeader} /></RequireRole>} />
                <Route path='notificaciones' element={<Notificaciones setHeader={setHeader} />} />
                <Route path='mi-agenda' element={<RequireRole roles={["MEDICO"]}><MiAgenda /></RequireRole>} />
                <Route path='mis-disponibilidades' element={<RequireRole roles={["MEDICO"]}><div>Falta hacer :)</div></RequireRole>} />
                <Route path='mis-datos' element={<MisDatos setHeader={setHeader} />} />
              </Route>
            </Routes>
          </ThemeProvider>
         </BrowserRouter>
        </AuthProvider>
      </LogtoProvider>
  );

}

export default App;
