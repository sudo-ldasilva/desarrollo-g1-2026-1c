import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, Box, Typography, Grid, CircularProgress, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import './MisServicios.css';
import { useAuth } from '../../hooks/useAuth';

const API_URL = process.env.REACT_APP_API_URL;

const formatCosto = (costo) => {
  if (!costo) return "";
  return `$${Number(costo).toLocaleString("es-AR")}`;
};

const MisServicios = () => {
  const { isAuthenticated, isLoading, getAccessToken } = useAuth();
  const getTokenRef = useRef(getAccessToken);
  getTokenRef.current = getAccessToken;
  const effectRan = useRef(false);

  const [especialidadesDelMedico, setEspecialidadesDelMedico] = useState([]);
  const [practicasDelMedico, setPracticasDelMedico] = useState([]);
  const [todasLasEspecialidades, setTodasLasEspecialidades] = useState([]);
  const [todasLasPracticas, setTodasLasPracticas] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [medicoId, setMedicoId] = useState(null);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [sinPerfilMedico, setSinPerfilMedico] = useState(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    if (effectRan.current) return;
    effectRan.current = true;

    const cargarDatos = async () => {
      try {
        const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);
        const headers = { Authorization: `Bearer ${token}` };

        const resMe = await axios.get(`${API_URL}/me`, { headers });
        const idMedico = resMe.data.idMedico;

        if (!idMedico) {
          setSinPerfilMedico(true);
          setCargandoDatos(false);
          return;
        }

        setMedicoId(idMedico);

        const [resEspecialidades, resPracticas, resMedico] = await Promise.all([
          axios.get(`${API_URL}/especialidades`, { headers }),
          axios.get(`${API_URL}/practicas`, { headers }),
          axios.get(`${API_URL}/medicos/${idMedico}`, { headers }),
        ]);

        setTodasLasEspecialidades(resEspecialidades.data);
        setTodasLasPracticas(resPracticas.data);
        setEspecialidadesDelMedico(resMedico.data.especialidades || []);
        setPracticasDelMedico(resMedico.data.practicas || []);
      } catch (error) {
        alert("Error al cargar los servicios médicos.");
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarDatos();
  }, [isAuthenticated, isLoading]);

  const getAuthHeaders = async () => {
    const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const opcionesServicios = [
    ...todasLasEspecialidades
      .filter(e => !especialidadesDelMedico.some(m => m._id === e._id))
      .map(e => ({
        value: e._id,
        tipo: "especialidad",
        label: `Especialidad — ${e.nombre}  — ${e.duracionTurnoEnMins} min — ${formatCosto(e.costo)}`
      })),
    ...todasLasPracticas
      .filter(p => !practicasDelMedico.some(m => m._id === p._id))
      .map(p => ({
        value: p._id,
        tipo: "practica",
        label: `Práctica — ${p.nombre} — ${p.duracionTurnoEnMins} min — ${formatCosto(p.costo)}`
      })),
  ];

  const serviciosDelMedico = [
    ...especialidadesDelMedico.map(e => ({ ...e, tipo: "Especialidad" })),
    ...practicasDelMedico.map(p => ({ ...p, tipo: "Práctica" })),
  ];

  const handleAgregarServicio = async (e) => {
    e.preventDefault();
    if (!servicioSeleccionado || !medicoId) return;

    const selectedOption = opcionesServicios.find(o => o.value === servicioSeleccionado);
    if (!selectedOption) return;

    try {
      const headers = await getAuthHeaders();

      if (selectedOption.tipo === "especialidad") {
        const currentIds = especialidadesDelMedico.map(s => s._id);

        await axios.patch(`${API_URL}/medicos/${medicoId}`, {
          especialidades: [...currentIds, servicioSeleccionado],
        }, headers);

        const nueva = todasLasEspecialidades.find(e => e._id === servicioSeleccionado);
        setEspecialidadesDelMedico([...especialidadesDelMedico, nueva]);

      } else {

        const currentIds = practicasDelMedico.map(s => s._id);

        await axios.patch(`${API_URL}/medicos/${medicoId}`, {
          practicas: [...currentIds, servicioSeleccionado],
        }, headers);

        const nueva = todasLasPracticas.find(p => p._id === servicioSeleccionado);
        setPracticasDelMedico([...practicasDelMedico, nueva]);

      }

      setServicioSeleccionado('');
    } catch (error) {
      alert("No se pudo asociar el servicio a tu perfil.");
    }
  };

  const handleQuitarServicio = async (servicio) => {
    if (!window.confirm("¿Estás seguro de que querés dejar de prestar este servicio? Se cancelarán tus disponibilidades asociadas.")) return;
    if (!medicoId) return;

    try {
      const headers = await getAuthHeaders();

      if (servicio.tipo === "Especialidad") {
        const currentIds = especialidadesDelMedico.map(s => s._id);

        await axios.patch(`${API_URL}/medicos/${medicoId}`, {
          especialidades: currentIds.filter(id => id !== servicio._id),
        }, headers);

        setEspecialidadesDelMedico(especialidadesDelMedico.filter(s => s._id !== servicio._id));

      } else {

        const currentIds = practicasDelMedico.map(s => s._id);

        await axios.patch(`${API_URL}/medicos/${medicoId}`, {
          practicas: currentIds.filter(id => id !== servicio._id),
        }, headers);

        setPracticasDelMedico(practicasDelMedico.filter(s => s._id !== servicio._id));

      }
    } catch (error) {
      alert("Error al remover el servicio.");
    }
  };

  if (isLoading || cargandoDatos) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="servicios-root">
        <Card className="servicios-card" style={{ textAlign: 'center' }}>
          <CardContent>
            <Typography variant="body1">Por favor, iniciá sesión para gestionar tus servicios.</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (sinPerfilMedico) {
    return (
      <Container className="servicios-root">
        <section className="dashboard-block">
          <div className="dashboard-block-header">
            <h2 className="dashboard-block-title">Mis servicios prestados</h2>
          </div>
        </section>
        <Card className="servicios-card">
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="body1">
              Aún no completaste tu perfil de médico. Completalo primero para gestionar tus servicios.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="servicios-root">

      <Card className="servicios-card">
        <CardContent className="servicios-card-content">
          <form onSubmit={handleAgregarServicio} className="servicios-form">
            <span className="servicios-form-label">Agregar nuevo servicio</span>
            <div className="servicios-form-row">
              <CustomSelect
                value={servicioSeleccionado}
                onChange={(e) => setServicioSeleccionado(e.target.value)}
                placeholder="Seleccioná un servicio"
                options={opcionesServicios}
                disabled={opcionesServicios.length === 0}
              />
              <button
                type="submit"
                className="servicios-btn-agregar"
                disabled={!servicioSeleccionado}
              >
                <AddIcon fontSize="small" /> Vincular
              </button>
            </div>
          </form>

          {serviciosDelMedico.length === 0 ? (
            <Box className="servicios-vacio">
              <Typography variant="body1">
                Aún no tenés servicios asignados. Utilizá el buscador de arriba para añadir el primero.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {serviciosDelMedico.map(s => (
                <Grid item xs={12} sm={6} md={4} key={`${s.tipo}-${s._id}`}>
                  <Card className="servicios-item-card" variant="outlined">
                    <CardContent className="servicios-item-content">
                      <h3 className="servicios-item-nombre">{s.nombre}</h3>
                      <hr className="servicios-divisor" />
                      <p className="servicios-item-body servicios-item-tipo">{s.tipo}</p>
                      <p className="servicios-item-body">Duración: {s.duracionTurnoEnMins || 30} min</p>
                      <hr className="servicios-divisor" />
                      <Box className="servicios-item-footer">
                        <span className="servicios-item-costo">
                          {formatCosto(s.costo)}
                        </span>
                        <button
                          className="servicios-btn-baja"
                          onClick={() => handleQuitarServicio(s)}
                        >
                          <ClearIcon fontSize="small" /> Dar de Baja
                        </button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MisServicios;
