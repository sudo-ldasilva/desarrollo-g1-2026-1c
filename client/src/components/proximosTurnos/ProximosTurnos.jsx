import {useState, useEffect} from 'react'
import CalendarioMensualTurnos from "../calendarioMensualTurnos/CalendarioMensualTurnos.jsx"
import TurnoInfo from "../turnoInfo/TurnoInfo.jsx"
import {getTurnosEnRangoFecha} from "../../services/TurnosService.jsx"
import { useLogto } from "@logto/react";

import { Card, CardHeader, CardContent, Skeleton, Alert } from '@mui/material';

import './ProximosTurnos.css';

const ProximosTurnos = (props) => {
    const { isAuthenticated, getAccessToken } = useLogto();

    const hoy = new Date()

    let [turnos, setTurnos] = useState([]);
    let [calendarioActualizado, setCalendarioActualizado] = useState(false);
    let [mesCalendario, setMesCalendario] = useState(hoy)
    let [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(hoy.setHours(0,0,0,0)))
    const turnosFiltrados = turnos.filter( (fecha) => new Date(fecha.fechaHora).toDateString() === fechaSeleccionada.toDateString() )

    const filtrarTurnos = (fecha) => {
        setFechaSeleccionada(fecha)
    }

    useEffect(() => {
        const obtenerTurnosParaCalendario = async () => {
            if (!isAuthenticated) return;

            const accessToken = await getAccessToken(
                "https://api-sweet-medical.com"
            );

            const siguienteMes = new Date(
                mesCalendario.getFullYear(),
                mesCalendario.getMonth() + 1,
                0,
                23,
                59,
                59
            );

            const anteriorMes = new Date(
                mesCalendario.getFullYear(),
                mesCalendario.getMonth() - 1,
                0,
                23,
                59,
                59
            );

            const turnosRecibidos = await getTurnosEnRangoFecha(
                accessToken,
                anteriorMes,
                siguienteMes
            );

            setTurnos(turnosRecibidos);
            setCalendarioActualizado(true);
        };

        obtenerTurnosParaCalendario();
    }, [mesCalendario, isAuthenticated, getAccessToken])

    const cambiarMesCalendario = (mes) => {
        setCalendarioActualizado(false);
        setMesCalendario(mes)
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
                                    <TurnoInfo key={turno.id} turno={turno} />
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
