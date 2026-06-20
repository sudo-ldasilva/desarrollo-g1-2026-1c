import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, Box, Typography, Grid, CircularProgress, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import './MisSedes.css';
import { useAuth } from '../../hooks/useAuth';

const API_URL = process.env.REACT_APP_API_URL;

const MisSedes = () => {
  const { isAuthenticated, isLoading, getAccessToken } = useAuth();
  const getTokenRef = useRef(getAccessToken);
  getTokenRef.current = getAccessToken;
  const effectRan = useRef(false);

  const [sedesDelMedico, setSedesDelMedico] = useState([]);
  const [todasLasSedes, setTodasLasSedes] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');
  const [medicoId, setMedicoId] = useState(null);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [sinPerfilMedico, setSinPerfilMedico] = useState(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    if (effectRan.current) return;
    effectRan.current = true;

    const cargarSedes = async () => {
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

        const [resSedes, resMedico] = await Promise.all([
          axios.get(`${API_URL}/sedes`, { headers }),
          axios.get(`${API_URL}/medicos/${idMedico}`, { headers }),
        ]);

        setTodasLasSedes(resSedes.data);
        setSedesDelMedico(resMedico.data.sedes || []);
      } catch (error) {
        alert("Error al cargar las sedes médicas.");
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarSedes();
  }, [isAuthenticated, isLoading]);

  const getAuthHeaders = async () => {
    const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleAgregarSede = async (e) => {
    e.preventDefault();
    if (!sedeSeleccionada || !medicoId) return;

    if (sedesDelMedico.some(s => s._id === sedeSeleccionada)) {
      alert("Ya te encontrás registrado en esta sede.");
      return;
    }

    try {
      const currentSedeIds = sedesDelMedico.map(s => s._id);
      const headers = await getAuthHeaders();

      await axios.patch(`${API_URL}/medicos/${medicoId}`, {
        sedes: [...currentSedeIds, sedeSeleccionada],
      }, headers);

      const nuevaSede = todasLasSedes.find(s => s._id === sedeSeleccionada);
      setSedesDelMedico([...sedesDelMedico, nuevaSede]);
      setSedeSeleccionada('');
    } catch (error) {
      alert("No se pudo asociar la sede a tu perfil.");
    }
  };

  const handleQuitarSede = async (idSede) => {
    if (!window.confirm("¿Estás seguro de que querés darte de baja de esta sede? Se cancelarán tus disponibilidades allí.")) return;
    if (!medicoId) return;

    try {
      const currentSedeIds = sedesDelMedico.map(s => s._id);
      const headers = await getAuthHeaders();

      await axios.patch(`${API_URL}/medicos/${medicoId}`, {
        sedes: currentSedeIds.filter(id => id !== idSede),
      }, headers);

      setSedesDelMedico(sedesDelMedico.filter(s => s._id !== idSede));
    } catch (error) {
      alert("Error al remover la sede.");
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
      <Container className="mis-sedes-root">
        <Card className="mis-sedes-card" style={{ textAlign: 'center' }}>
          <CardContent>
            <Typography variant="body1">Por favor, iniciá sesión para gestionar tus sedes.</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (sinPerfilMedico) {
    return (
      <Container className="mis-sedes-root">
        <section className="dashboard-block">
          <div className="dashboard-block-header">
            <h2 className="dashboard-block-title">Mis sedes</h2>
          </div>
        </section>
        <Card className="mis-sedes-card">
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="body1">
              Aún no completaste tu perfil de médico. Completalo primero para gestionar tus sedes.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mis-sedes-root">
        <section className="dashboard-block">
            <div className="dashboard-block-header">
                <h2 className="dashboard-block-title">Mis sedes</h2>
                <p className="dashboard-block-subtitle">Asigná o remové los centros médicos y clínicas donde prestás servicios presenciales</p>
            </div>
        </section>

      <Card className="mis-sedes-card">
        <CardContent className="mis-sedes-card-content">
            <form onSubmit={handleAgregarSede} className="mis-sedes-form">
                <span className="mis-sedes-form-label">Agregar nueva sede</span>
                <div className="mis-sedes-form-row">
                  <CustomSelect
                    value={sedeSeleccionada}
                    onChange={(e) => setSedeSeleccionada(e.target.value)}
                    placeholder="Seleccioná una sede"
                    options={todasLasSedes
                      .filter(sede => !sedesDelMedico.some(sm => sm._id === sede._id))
                      .map(s => ({
                        value: s._id,
                        label: `${s.nombre} — ${s.direccion || 'Dirección no especificada'}`
                      }))
                    }
                    disabled={todasLasSedes.length === 0}
                  />
                  <button
                    type="submit"
                    className="mis-sedes-btn-agregar"
                    disabled={!sedeSeleccionada}
                  >
                    <AddIcon fontSize="small" /> Vincular
                  </button>
                </div>
            </form>

            {sedesDelMedico.length === 0 ? (
              <Box className="mis-sedes-vacio">
                <Typography variant="body1">
                  No tenés sedes de atención asignadas. Añadí la primera desde el buscador superior.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {sedesDelMedico.map(s => (
                  <Grid item xs={12} sm={6} md={4} key={s._id}>
                    <Card className="mis-sedes-sede-card" variant="outlined">
                      <CardContent className="mis-sedes-sede-content">
                        <Typography className="mis-sedes-sede-title">
                          {s.nombre}
                        </Typography>
                        <hr className="mis-sedes-divisor" />
                        <Typography className="mis-sedes-direccion">
                          <LocationOnIcon fontSize="small" /> {s.direccion}
                        </Typography>
                        <hr className="mis-sedes-divisor" />
                        <Box className="mis-sedes-acciones">
                          <button
                            className="mis-sedes-btn-baja"
                            onClick={() => handleQuitarSede(s._id)}
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

export default MisSedes;
