import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Select, MenuItem, InputLabel, FormControl, Box, Typography, Grid } from '@mui/material';
import '../MisServicios/MisServicios.css'; // Reutilizo el css de servicios para no repetir código y que sea consistente

const MisSedes = () => {
  const [sedesDelMedico, setSedesDelMedico] = useState([]);
  const [todasLasSedes, setTodasLasSedes] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');

  // TODO: Traer el id de forma dinamica
  const medicoId = "645a1b2c3d4e5f6a7b8c9d99"; 

  
  useEffect(() => {
    const cargarSedes = async () => {
      try {
        // Sedes actuales donde atiende el médico --> No sé muy bien como traerlas
        const resMedico = await axios.get(`http://localhost:3001/medicos/${medicoId}/sedes`);
        setSedesDelMedico(resMedico.data);

        //Creo que esto está resuelto con el CRUD de sedes que teniamos pendiente
        const resGlobal = await axios.get('http://localhost:3001/sedes');
        setTodasLasSedes(resGlobal.data);
      } catch (error) {
        alert("Error al cargar las sedes médicas.");
      }
    };
    cargarSedes();
  }, []);

  const handleAgregarSede = async (e) => {
    e.preventDefault();
    if (!sedeSeleccionada) return;

    
    if (sedesDelMedico.some(s => s._id === sedeSeleccionada)) {
      alert("Ya te encontrás registrado en esta sede.");
      return;
    }

    try {
      // POST al backend para asociar la sede al médico --> pensar endpoint
      await axios.post(`http://localhost:3001/medicos/${medicoId}/sedes`, {
        sedeId: sedeSeleccionada
      });

      
      const nuevaSede = todasLasSedes.find(s => s._id === sedeSeleccionada);
      setSedesDelMedico([...sedesDelMedico, nuevaSede]);
      setSedeSeleccionada('');
    } catch (error) {
      alert("No se pudo asociar la sede a tu perfil.");
    }
  };

  
  const handleQuitarSede = async (idSede) => {
    if (window.confirm("¿Estás seguro de que querés darte de baja de esta sede? Se cancelarán tus disponibilidades allí.")) {
      try {
        // DELETE al endpoint que relaciona los médicos y las sedes
        await axios.delete(`http://localhost:3001/medicos/${medicoId}/sedes/${idSede}`);

        
        
        setSedesDelMedico(sedesDelMedico.filter(s => s._id !== idSede));
      } catch (error) {
        alert("Error al remover la sede.");
      }
    }
  };

  return (
    <div className="servicios-root">
      <Card className="servicios-container">
        <Typography variant="h5" className="titulo-seccion">🏢 Gestión de Mis Sedes de Atención</Typography>
        <p className="descripcion">Asigná o remové los centros médicos y clínicas donde prestás servicios presenciales.</p>

        <form onSubmit={handleAgregarSede} className="form-agregar">
          <Box display="flex" gap="1rem" alignItems="center">
            <FormControl fullWidth>
              <InputLabel>Seleccionar Nueva Sede</InputLabel>
              <Select
                value={sedeSeleccionada}
                label="Seleccionar Nueva Sede"
                onChange={(e) => setSedeSeleccionada(e.target.value)}
              >
      
                {todasLasSedes
                  .filter(sede => !sedesDelMedico.some(sm => sm._id === sede._id))
                  .map(s => (
                    <MenuItem key={s._id} value={s._id}>
                      {s.nombre} — {s.direccion || 'Dirección no especificada'}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" className="btn-agregar-srv">
              + Añadir
            </Button>
          </Box>
        </form>

        <hr className="divisor" />

        <Typography variant="h6" style={{ marginBottom: '1.5rem' }}>
          Sedes de Trabajo Activas ({sedesDelMedico.length})
        </Typography>

        {sedesDelMedico.length === 0 ? (
          <p className="no-servicios">No tenés sedes de atención asignadas. Añadí la primera desde el buscador superior.</p>
        ) : (
          <Grid container spacing={2}>
            {sedesDelMedico.map(s => (
              <Grid item xs={12} sm={6} md={4} key={s._id}>
                <Card className="card-servicio-item" variant="outlined">
                  <Box padding="1.5rem">
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                      {s.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '0.25rem' }}>
                      📍 {s.direccion}
                    </Typography>
                    

                    <Box display="flex" justifyContent="flex-end" marginTop="1.5rem">
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => handleQuitarSede(s._id)}
                        style={{ fontWeight: 'bold' }}
                      >
                        ❌ Dar de Baja
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

export default MisSedes;