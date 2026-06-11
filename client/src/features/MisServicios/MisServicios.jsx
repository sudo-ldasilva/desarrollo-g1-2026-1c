import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Select, MenuItem, InputLabel, FormControl, Box, Typography, Grid } from '@mui/material';
import './MisServicios.css';

const MisServicios = () => {
  const [serviciosDelMedico, setServiciosDelMedico] = useState([]);
  const [todosLosServicios, setTodosLosServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');

  // De alguna forma debería traerme al id del médico, sin hardcodearlo
  const medicoId = "645a1b2c3d4e5f6a7b8c9d99"; 

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        //Tendríamos que pensar cómo podemos traer los servicios del médico, el endpoint en particular
        const resMedico = await axios.get(`http://localhost:3001/medicos/${medicoId}/servicios`);
        setServiciosDelMedico(resMedico.data);

        //Si tenemos un endpoint donde traigamos especialidades y prácticas juntas, representarían nuestros servicios
        const resGlobal = await axios.get('http://localhost:3001/servicios');
        setTodosLosServicios(resGlobal.data);
      } catch (error) {
        alert("Error al cargar los servicios médicos.");
      }
    };
    cargarDatos();
  },[]);

  const handleAgregarServicio = async (e) => {
    e.preventDefault();
    if (!servicioSeleccionado) return;

    if (serviciosDelMedico.some(s => s._id === servicioSeleccionado)) {
      alert("Ya prestás este servicio médico.");
      return;
    }

    try {
      // Con el endpoint que hace falta crear podríamos hacer un POST para cargarle los nuevos servicios
      const res = await axios.post(`http://localhost:3001/medicos/${medicoId}/servicios`, {
        servicioId: servicioSeleccionado
      });
      
      
      const nuevoServicio = todosLosServicios.find(s => s._id === servicioSeleccionado);
      setServiciosDelMedico([...serviciosDelMedico, nuevoServicio]);
      setServicioSeleccionado(''); // Limpiamos el selector
    } catch (error) {
      alert("No se pudo asociar el servicio.");
    }
  };

  
  const handleQuitarServicio = async (idServicio) => {
    if (window.confirm("¿Estás seguro de que querés dejar de prestar este servicio?")) {
      try {
        // mismos endpoint --> Por el momento deberíamos manejar GET, POST y DELETE
        await axios.delete(`http://localhost:3001/medicos/${medicoId}/servicios/${idServicio}`);
        
        // Filtramos el estado local para sacar la card en ese momento
        setServiciosDelMedico(serviciosDelMedico.filter(s => s._id !== idServicio));
      } catch (error) {
        alert("Error al remover el servicio.");
      }
    }
  };

  return (
    <div className="servicios-root">
      <Card className="servicios-container">
        <Typography variant="h5" className="titulo-seccion">🩺 Gestión de Mis Servicios Prestados</Typography>
        <p className="descripcion">Configurá las especialidades y prácticas que realizás en Sweet Medical.</p>

       
        <form onSubmit={handleAgregarServicio} className="form-agregar">
          <Box display="flex" gap="1rem" alignItems="center">
            <FormControl fullWidth>
              <InputLabel>Seleccionar Nueva Práctica/Especialidad</InputLabel>
              <Select
                value={servicioSeleccionado}
                label="Seleccionar Nueva Práctica/Especialidad"
                onChange={(e) => setServicioSeleccionado(e.target.value)}
              >
                {todosLosServicios.map(s => (
                  <MenuItem key={s._id} value={s._id}>{s.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" className="btn-agregar-srv">
              + Vincular
            </Button>
          </Box>
        </form>

        <hr className="divisor" />

        
        <Typography variant="h6" style={{ marginBottom: '1.5rem' }}>Mis Prácticas Activas ({serviciosDelMedico.length})</Typography>
        
        {serviciosDelMedico.length === 0 ? (
          <p className="no-servicios">Aún no tenés servicios asignados. Utilizá el selector de arriba para añadir el primero.</p>
        ) : (
          <Grid container spacing={2}>
            {serviciosDelMedico.map(s => (
              <Grid item xs={12} sm={6} md={4} key={s._id}>
                <Card className="card-servicio-item" variant="outlined">
                  <Box padding="1.5rem">
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{s.nombre}</Typography>
                    <Typography variant="body2" color="textSecondary">Código: {s.codigo || 'N/A'}</Typography>
                    
                    <Box display="flex" justifyContent="flex-end" marginTop="1rem">
                      <Button 
                        variant="text" 
                        color="error" 
                        onClick={() => handleQuitarServicio(s._id)}
                        style={{ fontWeight: 'bold' }}
                      >
                        ❌ Desvincular
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Card>
    </div>
  );
};

export default MisServicios;