import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, CircularProgress } from '@mui/material';
import CredencialPerfil from '../../components/CredencialPerfil/CredencialPerfil';
import axios from 'axios';
import '../MisServicios/MisServicios.css'; // Reutilizamos el root y container para mantener consistencia visual

const MisDatos = () => {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simulamos la carga desde tu backend en el puerto 3001
    const obtenerPerfil = async () => {
      try {
        // Mañana cambiarás esto por tu axios.get('http://localhost:3001/me') real
        const respuestaSimulada = {
          nombre: 'Julian',
          apellido: 'Carpintero',
          dni: '44.123.456',
          obraSocial: 'Swiss Medical',
          plan: 'SMG20'
        };
        
        setPerfil(respuestaSimulada);
      } catch (error) {
        alert("Error al cargar los datos del perfil.");
      } finally {
        setCargando(false);
      }
    };

    obtenerPerfil();
  }, []);

  if (cargando) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <div className="servicios-root">
      <Card className="servicios-container">
        <Typography variant="h5" className="titulo-seccion" style={{ marginBottom: '1.5rem' }}>
           Mis Datos Personales
        </Typography>
        
        <Box display="flex" justifyContent="center" marginY="2rem">
          {perfil && <CredencialPerfil usuario={perfil} />}
        </Box>

        <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic', textAlign: 'center' }}>
          Presentá esta credencial digital en cualquiera de nuestras sedes físicas para agilizar tu atención médica.
        </Typography>
      </Card>
    </div>
  );
};

export default MisDatos;