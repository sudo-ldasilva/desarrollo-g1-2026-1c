import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import CredencialPerfil from '../../components/CredencialPerfil/CredencialPerfil';
import axios from 'axios';
import './MisDatos.css';
import { useLogto } from '@logto/react';

const MisDatos = () => {
  const { getAccessToken, isAuthenticated, isLoading } = useLogto();
  const getTokenRef = useRef(getAccessToken);
  getTokenRef.current = getAccessToken;
  const effectRan = useRef(false);
  const [perfil, setPerfil] = useState(null);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    if (effectRan.current) return;
    effectRan.current = true;

    const obtenerDatosDeSesion = async () => {
      try {
        const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);
        const headers = { Authorization: `Bearer ${token}` };

        const resMe = await axios.get(`${process.env.REACT_APP_API_URL}/me`, { headers });
        const idPaciente = resMe.data.idPaciente;

        if (idPaciente) {
          const resPaciente = await axios.get(
            `${process.env.REACT_APP_API_URL}/pacientes/${idPaciente}`, { headers }
          );

          if (resPaciente.data && resPaciente.data.data) {
            const pacienteReal = resPaciente.data.data;

            const datosCombinados = {
              nombre: pacienteReal.nombre || 'Nombre',
              dni: pacienteReal.dni || "XX.XXX.XXX",
              obraSocial: pacienteReal.obraSocial || "Particular",
              plan: pacienteReal.plan || "Sin Plan",
            };

            setPerfil(datosCombinados);
          }
        } else {
          console.warn("El usuario está logueado pero no tiene un perfil de paciente creado en la BD.");
        }
      } catch (error) {
        console.error("Error al capturar el perfil:", error);
        alert("Hubo un problema al sincronizar tus datos de afiliado.");
      } finally {
        setCargandoDatos(false);
      }
    };

    obtenerDatosDeSesion();
  }, [isAuthenticated, isLoading]);

  if (isLoading || cargandoDatos) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="mis-datos-container">
        <Card className="mis-datos-card" sx={{ textAlign: 'center' }}>
          <CardContent>
            <Typography variant="body1">Por favor, iniciá sesión para acceder a tu credencial.</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mis-datos-container">
      <Card className="mis-datos-card">
        <CardContent>
          <Typography variant="h5" className="mis-datos-titulo">
            Mis Datos Personales
          </Typography>

          <Box display="flex" justifyContent="center" marginY="2rem">
            {perfil && <CredencialPerfil paciente={perfil} />}
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
            Presentá esta credencial digital en cualquiera de nuestras sedes físicas para agilizar tu atención médica.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MisDatos;
