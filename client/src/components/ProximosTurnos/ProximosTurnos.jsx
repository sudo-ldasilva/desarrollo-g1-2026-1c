import {useState, useEffect, useRef} from 'react'
import CalendarioMensualTurnos from "../CalendarioMensualTurnos/CalendarioMensualTurnos.jsx"
import TurnoInfo from "../TurnoInfo/TurnoInfo.jsx"
import {getTurnosEnRangoFecha} from "../../services/TurnosService.jsx"
import { useAuth } from "../../hooks/useAuth.jsx";

import { Card, CardHeader, CardContent, Skeleton, Alert } from '@mui/material';

import './ProximosTurnos.css';

const ProximosTurnos = (props) => {
    const { isAuthenticated, getAccessToken } = useAuth();

    const hoy = new Date()

    let [turnos, setTurnos] = useState([]);
    let [calendarioActualizado, setCalendarioActualizado] = useState(false);
    let mesCalendario = useRef(hoy)
    let [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(hoy.setHours(0,0,0,0)))
    const turnosFiltrados = turnos.filter( (fecha) => new Date(fecha.fechaHora).toDateString() === fechaSeleccionada.toDateString() )

    const filtrarTurnos = (fecha) => {
        setFechaSeleccionada(fecha)
    }

    useEffect(() => {
        if (calendarioActualizado) return;

        const abortController = new AbortController();
        let ignore = false;

        const obtenerTurnosParaCalendario = async () => {
            try {
                if (!isAuthenticated) return;

                const accessToken = await getAccessToken(
                  process.env.REACT_APP_LOGTO_RESOURCES
                );

                if (!accessToken) return;

                const siguienteMes = new Date(
                    mesCalendario.current.getFullYear(),
                    mesCalendario.current.getMonth() + 1,
                    0,
                    23,
                    59,
                    59
                );

                const anteriorMes = new Date(
                    mesCalendario.current.getFullYear(),
                    mesCalendario.current.getMonth() - 1,
                    0,
                    23,
                    59,
                    59
                );

                const turnosRecibidos = await getTurnosEnRangoFecha(
                    accessToken,
                    anteriorMes,
                    siguienteMes,
                    abortController.signal
                );

                if (!ignore) {
                    setTurnos(turnosRecibidos);
                    setCalendarioActualizado(true);
                }
            } catch {
                // Component may be unmounting during sign-out
            }
        };

        obtenerTurnosParaCalendario();
        return () => {
            ignore = true;
            abortController.abort();
        };
    }, [calendarioActualizado, isAuthenticated, getAccessToken])

    const cambiarMesCalendario = (mes) => {
        mesCalendario.current = mes;
        setCalendarioActualizado(false);
    }

    return (
        <Card className="ProximosTurnos" >
            <CardHeader title="Turnos Próximos"></CardHeader>

            <CardContent className="ProximosTurnos_content">
                {
                    <CalendarioMensualTurnos
                        className="ProximosTurnos_content_child"
                        soloNuevos
                        turnos={turnos}
                        eventoSeleccionarFecha={filtrarTurnos}
                        eventoCambiarMes={cambiarMesCalendario}
                        eventosCargados={calendarioActualizado}
                    />
                }

                <div className="ProximosTurnos_turnos ProximosTurnos_content_child">
                    {
                        calendarioActualizado ? (
                            turnosFiltrados.length !== 0 ?
                            (
                                turnosFiltrados.map( (turno) => (
                                    <TurnoInfo
                                        key={turno.id}
                                        turno={turno}
                                        onCancelar={() => {}}
                                        onReprogramar={() => {}}
                                    />
                                ))
                            ) :
                            (
                                <Alert severity="info">No hay turnos para el dia seleccionado</Alert>
                            )
                        ) : (
                            <Skeleton variant="rounded" height="50px" />
                        )
                    }
                </div>
            </CardContent>
        </Card>
    )
};

export default ProximosTurnos;
