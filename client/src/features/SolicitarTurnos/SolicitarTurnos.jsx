import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Button, Select, MenuItem, InputLabel, FormControl, Box, CircularProgress } from '@mui/material';
import CardTurno from '../../components/CardTurno/CardTurno';
import './SolicitarTurnos.css';

const filtrosReducer = (state, action) => {
    switch (action.type) {
        case "SET_SERVICIO":
            return { ...state, servicioSeleccionado: action.value };
        case "SET_SEDE":
            return { ...state, sedeSeleccionada: action.value };
        default:
            return state;
    }
};

const resultadosReducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_START":
            return { ...state, cargando: true, busquedaRealizada: true };
        case "SEARCH_SUCCESS":
            return { ...state, cargando: false, turnosDisponibles: action.turnos };
        case "SEARCH_ERROR":
            return { ...state, cargando: false, turnosDisponibles: [] };
        default:
            return state;
    }
};

const SolicitarTurnos = ({ agregarAlCarrito, carrito }) => {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [filtros, dispatchFiltros] = useReducer(filtrosReducer, {
      servicioSeleccionado: '',
      sedeSeleccionada: ''
  });
  const [resultados, dispatchResultados] = useReducer(resultadosReducer, {
      turnosDisponibles: [],
      cargando: false,
      busquedaRealizada: false
  });

  useEffect(() => {
    const abortController = new AbortController();
    let ignore = false;

    axios.get('http://localhost:3000/api/practicas', { signal: abortController.signal })
      .then(res => { if (!ignore) setServicios(res.data); })
      .catch(() => { if (!ignore) alert("Error al cargar los servicios médicos."); });

    return () => {
      ignore = true;
      abortController.abort();
    };
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!filtros.servicioSeleccionado) return;

    dispatchResultados({ type: "SEARCH_START" });
    try {

        //REVISAR
        //tendríamos que traer los turnos filtrados por estado, mostrando solamente los disponibles
      const res = await axios.get('http://localhost:3000/turnos/disponibles', {
        params: {
          practicaId: filtros.servicioSeleccionado,
          sedeId: filtros.sedeSeleccionada || undefined
        }
      });
      dispatchResultados({ type: "SEARCH_SUCCESS", turnos: res.data });
    } catch {
      alert("Error al buscar turnos disponibles.");
      dispatchResultados({ type: "SEARCH_ERROR" });
    }
  };

  return (
    <div className="solicitar-root">
        <section className="dashboard-block">
            <div className="dashboard-block-header">
                <h2 className="dashboard-block-title">Solicitar turno</h2>
                <p className="dashboard-block-subtitle">Solicitar un turno médico.</p>
            </div>
        </section>

      <Card className="buscador-card">
        <CardContent>
            <form onSubmit={handleBuscar}>
              <Box display="flex" gap="1rem">
                <FormControl fullWidth>
                  <InputLabel>Filtrar por Servicio *</InputLabel>
                  <Select
                    value={filtros.servicioSeleccionado}
                    label="Filtrar por Servicio *"
                    onChange={(e) => dispatchFiltros({ type: "SET_SERVICIO", value: e.target.value })}
                  >
                    {servicios.map(srv => (
                      <MenuItem key={srv._id || srv.id} value={srv._id || srv.id}>{srv.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Filtrar por Sede</InputLabel>
                  <Select
                    value={filtros.sedeSeleccionada}
                    label="Filtrar por Sede"
                    onChange={(e) => dispatchFiltros({ type: "SET_SEDE", value: e.target.value })}
                  >
                    <MenuItem value=""><em>Todas las sedes</em></MenuItem>
                    <MenuItem value="645a1b2c3d4e5f6a7b8c9d02">Sede Palermo</MenuItem>
                    <MenuItem value="645a1b2c3d4e5f6a7b8c9d05">Sede Flores</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button type="submit" variant="contained" style={{ backgroundColor: '#c90e31', color: 'white', marginTop: "1rem"}}>
                Buscar Turnos
              </Button>
            </form>

            {resultados.cargando ? (
              <Box textAlign="center" marginTop="2rem"><CircularProgress color="error" /></Box>
            ) : (
              <div className="resultados-listado" style={{ marginTop: '2rem' }}>
                {resultados.busquedaRealizada && resultados.turnosDisponibles.length === 0 && <p>No hay turnos disponibles.</p>}

                {resultados.turnosDisponibles.map(turno => {
                  const yaEnCarrito = carrito.some(item => item._id === turno._id || item.id === turno.id);
                  return (
                    <div key={turno._id || turno.id} style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                      <CardTurno turno={turno} />
                      <Button
                        variant="contained"
                        disabled={yaEnCarrito}
                        style={{ backgroundColor: yaEnCarrito ? '#ccc' : '#089e3a', color: 'white', marginTop: '0.5rem' }}
                        onClick={() => agregarAlCarrito(turno)}
                      >
                        {yaEnCarrito ? "✔ Preseleccionado" : "+ Preseleccionar"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
      </Card>
    </div>
  );
};

export default SolicitarTurnos;
