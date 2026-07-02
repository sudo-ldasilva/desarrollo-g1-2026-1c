import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Box, Typography, Grid, CircularProgress, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearIcon from '@mui/icons-material/Clear';
import './MisDisponibilidades.css';
import { useAuth } from '../../hooks/useAuth';
import { getMe, getMedicoById, agregarDisponibilidadMedico, eliminarDisponibilidadMedico } from '../../services/PerfilService';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

const diaSemanaOpciones = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

const MisDisponibilidades = () => {
  const { isAuthenticated, isLoading, getAccessToken } = useAuth();
  const getTokenRef = useRef(getAccessToken);
  getTokenRef.current = getAccessToken;
  const effectRan = useRef(false);

  const [medicoId, setMedicoId] = useState(null);
  const [sedes, setSedes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [practicas, setPracticas] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);

  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [sedeId, setSedeId] = useState('');
  const [servicioId, setServicioId] = useState('');
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('12:00');

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    if (effectRan.current) return;
    effectRan.current = true;

    const cargarDatos = async () => {
      try {
        const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);
        const perfil = await getMe(token);

        if (!perfil?.idMedico) {
          setCargandoDatos(false);
          return;
        }

        const medicoData = await getMedicoById(token, perfil.idMedico);

        setMedicoId(perfil.idMedico);
        setSedes(medicoData.sedes || []);
        setEspecialidades(medicoData.especialidades || []);
        setPracticas(medicoData.practicas || []);
        setDisponibilidades(medicoData.disponibilidades || []);
      } catch (error) {
        alert('Error al cargar datos iniciales.');
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarDatos();
  }, [isAuthenticated, isLoading]);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!sedeId || !servicioId || !dia || !medicoId) {
      alert('Completá sede, servicio y día.');
      return;
    }

    const esEspecialidad = especialidades.some(esp => esp._id === servicioId);

    const payload = {
      sede: sedeId,
      diasSemana: [dia],
      horaInicio,
      horaFin,
      ...(esEspecialidad ? { especialidad: servicioId } : { practica: servicioId })
    };

    setGuardando(true);
    try {
      const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);

      await agregarDisponibilidadMedico(token, medicoId, payload);
      const medicoData = await getMedicoById(token, medicoId);
      setDisponibilidades(medicoData.disponibilidades || []);

      setSedeId('');
      setServicioId('');
      setDia('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  const handleQuitar = async (idDisp) => {
    if (!window.confirm('¿Querés eliminar este horario?')) return;

    setGuardando(true);
    try {
      const token = await getTokenRef.current(process.env.REACT_APP_LOGTO_RESOURCES);

      await eliminarDisponibilidadMedico(token, medicoId, idDisp);
      const medicoData = await getMedicoById(token, medicoId);
      setDisponibilidades(medicoData.disponibilidades || []);
    } catch (error) {
      alert('Error al eliminar');
    } finally {
      setGuardando(false);
    }
  };

  const getNombreSede = (id) => sedes.find(s => s._id === id)?.nombre || 'Sede';
  const getNombreServicio = (disp) => {
    if (disp.especialidad) return especialidades.find(e => e._id === disp.especialidad)?.nombre || 'Especialidad';
    if (disp.practica) return practicas.find(p => p._id === disp.practica)?.nombre || 'Práctica';
    return 'Servicio';
  };

  if (cargandoDatos || isLoading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress color="error" /></Box>;
  if (!medicoId) return <Typography align="center" p={5}>Completá tu perfil primero.</Typography>;

  return (
    <Card className="mis-disp-card">
      <CardContent className="no-pad">

        <form onSubmit={handleAgregar} className="mis-disp-form">
          <span className="mis-disp-form-label">Agregar nuevo horario de atención</span>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <CustomSelect
                value={sedeId}
                onChange={(e) => setSedeId(e.target.value)}
                placeholder="Seleccioná una sede"
                options={sedes.map(s => ({ value: s._id, label: s.nombre }))}
                disabled={guardando}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomSelect
                value={servicioId}
                onChange={(e) => setServicioId(e.target.value)}
                placeholder="Seleccioná un servicio"
                options={[
                  ...especialidades.map(e => ({ value: e._id, label: `Especialidad — ${e.nombre}` })),
                  ...practicas.map(p => ({ value: p._id, label: `Práctica — ${p.nombre}` }))
                ]}
                disabled={guardando}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <CustomSelect
                value={dia}
                onChange={(e) => setDia(e.target.value)}
                placeholder="Seleccioná un día"
                options={diaSemanaOpciones.map(d => ({ value: d, label: d }))}
                disabled={guardando}
              />
            </Grid>

            <Grid item xs={6} md={1.5}>
              <TextField fullWidth size="small" type="time" label="Inicio" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} InputLabelProps={{ shrink: true }} disabled={guardando}/>
            </Grid>

            <Grid item xs={6} md={1.5}>
              <TextField fullWidth size="small" type="time" label="Fin" value={horaFin} onChange={e => setHoraFin(e.target.value)} InputLabelProps={{ shrink: true }} disabled={guardando}/>
            </Grid>

            <Grid item xs={12} md={2}>
              <button type="submit" className="mis-disp-btn-agregar" disabled={guardando || !sedeId || !servicioId || !dia}>
                {guardando ? <CircularProgress size={20} color="inherit" /> : <><AddIcon fontSize="small"/> Guardar</>}
              </button>
            </Grid>
          </Grid>
        </form>

        <hr className="mis-disp-hr" />

        {(!Array.isArray(disponibilidades) || disponibilidades.length === 0) ? (
          <Box className="mis-disp-vacio">
            <Typography variant="body1">No hay disponibilidades configuradas. Utilizá el formulario de arriba para añadir la primera.</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {disponibilidades.map(disp => (
              <Grid item xs={12} sm={6} md={4} key={disp._id}>
                <Card variant="outlined" className="mis-disp-item-card">
                  <CardContent className="mis-disp-item-content">
                    <h3 className="mis-disp-item-nombre">
                      {Array.isArray(disp.diasSemana) ? disp.diasSemana.join(', ') : disp.diasSemana}
                    </h3>
                    <hr className="mis-disp-divisor" />

                    <Box display="flex" alignItems="center" gap={1} mb={1} color="textSecondary">
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="body2">{disp.horaInicio} - {disp.horaFin}</Typography>
                    </Box>

                    <Typography variant="body2"><strong>Sede:</strong> {getNombreSede(disp.sede)}</Typography>
                    <Typography variant="body2"><strong>Servicio:</strong> {getNombreServicio(disp)}</Typography>

                    <hr className="mis-disp-divisor" />

                    <Box className="mis-disp-item-footer">
                      <button type="button" className="mis-disp-btn-baja" onClick={() => handleQuitar(disp._id)} disabled={guardando}>
                        <ClearIcon fontSize="small" /> Eliminar
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
  );
};

export default MisDisponibilidades;
