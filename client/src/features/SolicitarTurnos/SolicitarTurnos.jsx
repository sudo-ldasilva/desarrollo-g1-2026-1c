import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Select, MenuItem, InputLabel, FormControl, Box, CircularProgress } from '@mui/material';
import CardTurno from '../../components/CardTurno/CardTurno';
import './SolicitarTurnos.css';

const SolicitarTurnos = ({ agregarAlCarrito, carrito }) => {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/practicas')
      .then(res => setServicios(res.data))
      .catch(() => alert("Error al cargar los servicios médicos."));
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!servicioSeleccionado) return;

    setCargando(true);
    setBusquedaRealizada(true);
    try {
        
        //REVISAR
        //tendríamos que traer los turnos filtrados por estado, mostrando solamente los disponibles
      const res = await axios.get('http://localhost:3000/turnos/disponibles', {
        params: { 
          practicaId: servicioSeleccionado,
          sedeId: sedeSeleccionada || undefined
        }
      });
      setTurnosDisponibles(res.data);
    } catch {
      alert("Error al buscar turnos disponibles.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="solicitar-root">
      <Box className='caja-carrito'>
        <Button 
          variant="contained" 
          disabled={carrito.length === 0}
          onClick={() => navigate('/app/solicitar-turnos/carrito')}
          style={{ backgroundColor: carrito.length > 0 ? '#c90e31' : '#ccc', color: 'white', fontWeight: 'bold' }}
        >
          🛒 Ver mi Preselección ({carrito.length})
        </Button>
      </Box>

      <Card className="buscador-card">
        <h2 className="titulo-solicitar">Solicitar Turnos Médicos</h2>
        
        <form onSubmit={handleBuscar}>
          <Box display="flex" gap="1rem" marginBottom="1.5rem">
            <FormControl fullWidth>
              <InputLabel>Filtrar por Servicio *</InputLabel>
              <Select
                value={servicioSeleccionado}
                label="Filtrar por Servicio *"
                onChange={(e) => setServicioSeleccionado(e.target.value)}
              >
                {servicios.map(srv => (
                  <MenuItem key={srv._id || srv.id} value={srv._id || srv.id}>{srv.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Filtrar por Sede</InputLabel>
              <Select
                value={sedeSeleccionada}
                label="Filtrar por Sede"
                onChange={(e) => setSedeSeleccionada(e.target.value)}
              >
                <MenuItem value=""><em>Todas las sedes</em></MenuItem>
                <MenuItem value="645a1b2c3d4e5f6a7b8c9d02">Sede Palermo</MenuItem>
                <MenuItem value="645a1b2c3d4e5f6a7b8c9d05">Sede Flores</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button type="submit" variant="contained" style={{ backgroundColor: '#c90e31', color: 'white' }}>
            Buscar Turnos
          </Button>
        </form>

        {cargando ? (
          <Box textAlign="center" marginTop="2rem"><CircularProgress color="error" /></Box>
        ) : (
          <div className="resultados-listado" style={{ marginTop: '2rem' }}>
            {busquedaRealizada && turnosDisponibles.length === 0 && <p>No hay turnos disponibles.</p>}
            
            {turnosDisponibles.map(turno => {
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
      </Card>
    </div>
  );
};

export default SolicitarTurnos;