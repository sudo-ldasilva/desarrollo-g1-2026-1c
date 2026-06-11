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
import CompletarPerfil from './features/CompletarPerfil/CompletarPerfil.jsx';
import RequiereAuth from './components/RequiereAuth.jsx';
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

    // TODO Eliminar
    const persistirReservasEnBackend = async (turnosElegidos) => {
        const ids = turnosElegidos.map(t => t._id || t.id);
        //REVISAR
        //ACÁ falta resolver como reservamos todos los turnos preseleccionados
        await axios.post('http://localhost:3000/turnos/{t.id}/cambios-estado', { turnos: ids });
    };

    // Turnos preseleccionados (estado compartido para el carrito)
    const [turnosPreseleccionados, setTurnosPreseleccionados] = useState([]);

    // TODO Datos de ejemplo. Eliminar luego.
    useEffect(() => {
        setTurnosPreseleccionados([
            {
                id: 1,
                servicio: {nombre: "Dermatologia"},
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "15/6/2026 - 11:30 a. m. hs",
                costo: 1000
            },
            {
                id: 2,
                servicio: {nombre: "Cardiologia"},
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "15/6/2026 - 11:30 a. m. hs",
                costo: 1000000
            },
            {
                id: 3,
                servicio: {nombre: "Oftalmologia"},
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "5/6/2026 - 11:30 a. m. hs",
                costo: 6000
            },
        ]);
    }, []);

    const confirmarReserva = () => {
        setTurnosPreseleccionados([]);
        alert("¡Seleccionados!");
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
      <LogtoProvider config={config}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/completar-perfil" element={<CompletarPerfil />} />

              <Route path="/app" element={<EntornoUsuario />} >

                <Route
                  path="solicitar-turnos"
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
                  path="mis-turnos"
                  element={
                    <RequiereAuth>
                      <MisTurnos
                        turnos={turnos}
                      />
                    </RequiereAuth>
                  }
                />

                <Route
                  path="solicitar-turnos/carrito"
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
                <Route path='mis-servicios' element={
                  <RequiereAuth>
                    <MisServicios/>
                  </RequiereAuth>
                }
                />
                <Route index element={
                  <RequiereAuth>
                    <Dashboard
                        turnosPreseleccionados={turnosPreseleccionados}
                        confirmarReserva={confirmarReserva}
                    />
                  </RequiereAuth>
                }
                />
                <Route path='dashboard' element={
                  <RequiereAuth>
                    <Dashboard
                        turnosPreseleccionados={turnosPreseleccionados}
                        confirmarReserva={confirmarReserva}
                    />
                  </RequiereAuth>
                }
                />
                <Route path='mis-sedes' element={
                  <RequiereAuth>
                    <MisSedes/>
                  </RequiereAuth>
                }
                />
                <Route path='notificaciones' element={
                  <RequiereAuth>
                    <Notificaciones/>
                  </RequiereAuth>
                }
                />
              </Route>
            </Routes>
          </ThemeProvider>
         </BrowserRouter>
      </LogtoProvider>
  );

}

export default App;
