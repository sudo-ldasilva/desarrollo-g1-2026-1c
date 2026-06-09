import {useState, useEffect} from 'react'
import CalendarioMensualTurnos from "../calendarioMensualTurnos/CalendarioMensualTurnos.jsx"
import TurnoInfo from "../turnoInfo/TurnoInfo.jsx"
import {getTurnosEnRangoFecha} from "../../services/TurnosService.jsx"
import { useLogto } from "@logto/react";

import { Card, CardHeader, Skeleton, Alert } from '@mui/material';

import './ProximosTurnos.css';

const ProximosTurnos = (props) => {
    const { isAuthenticated, getAccessToken } = useLogto();

    const hoy = new Date()

    let [turnos, setTurnos] = useState([]);
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
        };

        obtenerTurnosParaCalendario();
    }, [mesCalendario, isAuthenticated, getAccessToken])

    return (
        <Card sx={{width: "100%", height: "fit-content"}} className="ProximosTurnos" >
            <CardHeader title="Turnos Próximos"></CardHeader>
            {
                turnos.length !== 0 ?
                (
                    <CalendarioMensualTurnos soloNuevos turnos={turnos} eventoSeleccionarFecha={filtrarTurnos} eventoCambiarMes={setMesCalendario} />
                ) : (
                    <Skeleton variant="rounded" height="330px" />
                )
            }

            <div className="ProximosTurnos_turnos">
                {
                    turnos.length !== 0 ?
                    (
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
                        <>
                            <Skeleton variant="rounded" height="180px" />
                            <Skeleton variant="rounded" height="180px" />
                            <Skeleton variant="rounded" height="180px" />
                        </>
                )
                }
            </div>
        </Card>
    )
};

export default ProximosTurnos;
