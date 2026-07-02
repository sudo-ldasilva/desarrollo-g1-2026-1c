import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Box, Typography, Grid, CircularProgress, TextField, Select, MenuItem, InputLabel, FormControl, ListSubheader } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearIcon from '@mui/icons-material/Clear';
import './MisDisponibilidades.css';
import { useAuth } from '../../hooks/useAuth';
import { getMe, getMedicoById, agregarDisponibilidadMedico, eliminarDisponibilidadMedico } from '../../services/PerfilService';

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
      
      const response = await agregarDisponibilidadMedico(token, medicoId, payload);
      setDisponibilidades(response.data);

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
      const response = await eliminarDisponibilidadMedico(token, medicoId, idDisp);
      
      setDisponibilidades(response.data);
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
      <CardContent>
        <Typography variant="h5" mb={3}>Mis Disponibilidades</Typography>

        <form onSubmit={handleAgregar} className="mis-disp-form">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Sede</InputLabel>
                <Select value={sedeId} label="Sede" onChange={e => setSedeId(e.target.value)} disabled={guardando}>
                  {sedes.map(s => <MenuItem key={s._id} value={s._id}>{s.nombre}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Servicio</InputLabel>
                <Select value={servicioId} label="Servicio" onChange={e => setServicioId(e.target.value)} disabled={guardando}>
                  {especialidades.length > 0 && <ListSubheader>Especialidades</ListSubheader>}
                  {especialidades.map(e => <MenuItem key={e._id} value={e._id}>{e.nombre}</MenuItem>)}
                  
                  {practicas.length > 0 && <ListSubheader>Prácticas</ListSubheader>}
                  {practicas.map(p => <MenuItem key={p._id} value={p._id}>{p.nombre}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Día</InputLabel>
                <Select value={dia} label="Día" onChange={e => setDia(e.target.value)} disabled={guardando}>
                  {diaSemanaOpciones.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
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

        <Typography variant="h6" mb={2} mt={4}>Horarios configurados</Typography>
        
        {disponibilidades.length === 0 ? (
          <Typography color="textSecondary">No hay disponibilidades configuradas.</Typography>
        ) : (
          <Grid container spacing={2}>
            {disponibilidades.map(disp => (
              <Grid item xs={12} sm={6} md={4} key={disp._id}>
                <Card variant="outlined" className="mis-disp-item-card">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {Array.isArray(disp.diasSemana) ? disp.diasSemana.join(', ') : disp.diasSemana}
                    </Typography>
                    
                    <Box display="flex" alignItems="center" gap={1} my={1} color="textSecondary">
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="body2">{disp.horaInicio} - {disp.horaFin}</Typography>
                    </Box>

                    <Typography variant="body2"><strong>Sede:</strong> {getNombreSede(disp.sede)}</Typography>
                    <Typography variant="body2" mb={2}><strong>Servicio:</strong> {getNombreServicio(disp)}</Typography>

                    <button type="button" className="mis-disp-btn-baja" onClick={() => handleQuitar(disp._id)} disabled={guardando}>
                      <ClearIcon fontSize="small" /> Eliminar
                    </button>
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
