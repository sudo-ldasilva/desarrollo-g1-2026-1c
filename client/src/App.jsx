import { createTheme, ThemeProvider } from '@mui/material';
import { LogtoProvider } from '@logto/react';
import EntornoUsuario from "./features/entornoUsuario/EntornoUsuario.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Callback from './components/Callback.jsx';
import Home from './features/Home.jsx';
import SolicitarTurnos from './features/SolicitarTurnos/SolicitarTurnos.jsx';
import CarritoPreseleccion from './features/CarritoPreseleccion/CarritoPreseleccion.jsx';
import CompletarPerfil from './features/CompletarPerfil/CompletarPerfil.jsx';
import RequiereAuth from './components/RequiereAuth.jsx';
import axios from 'axios';
import React, {useState} from 'react';
import MisServicios from './features/MisServicios/MisServicios.jsx';

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

function App() {
  const config = {
    endpoint: 'https://mm32is.logto.app/',
    appId: 'o5yyg82jt0gb2b8nbiuje',
    redirectUri: `${window.location.origin}/callback`,
    postLogoutRedirectUri: window.location.origin,
    resources: ['https://api-sweet-medical.com']
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
              <Route path="/completar-perfil" element={<CompletarPerfil />} />

              <Route
                path="/app"
                element={<EntornoUsuario />}
              />

              <Route
                path="/app/solicitar-turnos"
                element={
                  <RequiereAuth>
                    <SolicitarTurnos
                      carrito={carrito}
                      agregarAlCarrito={agregarAlCarrito}
                    />
                  </RequiereAuth>
                }
              />

              <Route
                path="/app/solicitar-turnos/carrito"
                element={
                  <RequiereAuth>
                    <CarritoPreseleccion
                      carrito={carrito}
                      eliminarDelCarrito={eliminarDelCarrito}
                      limpiarCarrito={limpiarCarrito}
                      persistirReservasEnBackend={persistirReservasEnBackend}
                    />
                  </RequiereAuth>
                }
              />
              <Route path='/app/mis-servicios' element={
                <RequiereAuth>
                  <MisServicios/>
                </RequiereAuth>
              }
              />
            </Routes>
          </ThemeProvider>
         </BrowserRouter>
      </LogtoProvider>
  );
}

export default App;