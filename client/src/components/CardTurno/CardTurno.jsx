import { useState, useMemo  } from 'react';
import './CardTurno.css';
import { cancelarTurno } from "../../services/TurnosService.jsx"
import { useAuth } from "../../hooks/useAuth.jsx";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CardTurno = ({ turno }) => {
    const razonesCancelación = [
        "No puedo asistir",
        "Encontré un mejor médico",
        "Baitear médico",
        "Otro motivo"
    ]

    const { userRole, getAccessToken } = useAuth();
    const [estado, setEstado] = useState(turno.estado || 'RESERVADO');

    const [esMedico, setMedico] = useState(false)

    useMemo(() => {
        setMedico(userRole === "MEDICO")
    }, [userRole]);

    const horaTurno = new Date(turno.fechaHora);
    const ahora = new Date();
    const diferenciaEnMilisegundos = horaTurno - ahora;
    const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);

    const estaEnHora = diferenciaEnHoras >= 1;
    const puedeCancelar = estado === "RESERVADO" && estaEnHora;

    const [open, setOpen] = useState(false);
    const [motivo, setMotivo] = useState(razonesCancelación[0]);

    const abrirDialogo = () => {
        setOpen(true);
    };

    const cerrarDialogo = () => {
        setOpen(false);
        setMotivo(razonesCancelación[0]);
    };

    const manejarCancelacion = async () => {
        if (puedeCancelar) {
            const accessToken = await getAccessToken(
              process.env.REACT_APP_LOGTO_RESOURCES
            );

            cancelarTurno(accessToken, turno._id, motivo)

            setEstado('CANCELADO');
            cerrarDialogo();
        }
    };

    const cambiarMotivo = (event) => {
        setMotivo(event.target.value)
    }

    if (esMedico) {
        return (
            <div>
                <div className="listado-card">
                    <div className={`turno-card ${estado.toLowerCase()}`}>
                        <div className="turno-header">
                            <h3 className="turno-servicio">{turno.paciente.nombre}</h3>
                            <span className={`turno-estado ${estado.toLowerCase()}`}>{estado}</span>
                        </div>
                        <p className="turno-medico">{turno.paciente.obraSocial.nombre} | {turno.paciente.plan.nombre}</p>
                        <p className="turno-sede">Sede: {turno.sede.nombre}</p>

                        <div className="turno-detalles">
                            <div className="turno-costo">
                                {turno.costo === 0 ? "Cubierto Totalmente" : `$${turno.costo.toLocaleString("es-AR")}`}
                            </div>
                            <div className='turno-hora'>
                                {horaTurno.toLocaleDateString("es-AR")} - {horaTurno.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' })} hs
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={abrirDialogo}
                            disabled={!puedeCancelar}
                            className='btn-cancelar btn-derecha'
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                <Dialog
                    open={open}
                    onClose={cerrarDialogo}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Cancelar turno</DialogTitle>

                    <DialogContent>
                        <FormControl fullWidth style={{marginTop: "0.5rem"}}>
                              <InputLabel id="demo-simple-select-label">Motivo de la cancelación</InputLabel>
                              <Select
                                value={motivo}
                                label="Motivo de la cancelación"
                                onChange={cambiarMotivo}
                              >
                                  {
                                      razonesCancelación.map((motivoPred) => (
                                          <MenuItem value={motivoPred}>{motivoPred}</MenuItem>
                                      ))
                                  }
                              </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={cerrarDialogo}>
                            Volver
                        </Button>

                        <Button
                            variant="contained"
                            onClick={manejarCancelacion}
                            disabled={!motivo.trim()}
                        >
                            Confirmar cancelación
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    } else {
        return (
            <div>
                <div className="listado-card">
                    <div className={`turno-card ${estado.toLowerCase()}`}>
                        <div className="turno-header">
                            <h3 className="turno-servicio">{turno.servicio.nombre}</h3>
                            <span className={`turno-estado ${estado.toLowerCase()}`}>{estado}</span>
                        </div>
                        <p className="turno-medico">Dr/a. {turno.medico.nombre} (M.N. {turno.medico.matricula})</p>
                        <p className="turno-sede">Sede: {turno.sede.nombre}</p>

                        <div className="turno-detalles">
                            <div className="turno-costo">
                                {turno.costo === 0 ? "Cubierto Totalmente" : `$${turno.costo.toLocaleString("es-AR")}`}
                            </div>
                            <div className='turno-hora'>
                                {horaTurno.toLocaleDateString("es-AR")} - {horaTurno.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' })} hs
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={abrirDialogo}
                            disabled={!puedeCancelar}
                            className='btn-cancelar btn-derecha'
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                <Dialog
                    open={open}
                    onClose={cerrarDialogo}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Cancelar turno</DialogTitle>

                    <DialogContent>
                        <FormControl fullWidth style={{marginTop: "0.5rem"}}>
                              <InputLabel id="demo-simple-select-label">Motivo de la cancelación</InputLabel>
                              <Select
                                value={motivo}
                                label="Motivo de la cancelación"
                                onChange={cambiarMotivo}
                              >
                                  {
                                      razonesCancelación.map((motivoPred) => (
                                          <MenuItem value={motivoPred}>{motivoPred}</MenuItem>
                                      ))
                                  }
                              </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={cerrarDialogo}>
                            Volver
                        </Button>

                        <Button
                            variant="contained"
                            onClick={manejarCancelacion}
                            disabled={!motivo.trim()}
                        >
                            Confirmar cancelación
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};

export default CardTurno;
