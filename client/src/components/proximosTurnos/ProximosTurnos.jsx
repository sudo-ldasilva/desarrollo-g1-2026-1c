import {useState, useEffect} from 'react'
import CalendarioMensualTurnos from "../calendarioMensualTurnos/CalendarioMensualTurnos.jsx"
import TurnoInfo from "../turnoInfo/TurnoInfo.jsx"

import { Card, CardHeader, Skeleton, Alert } from '@mui/material';

import './ProximosTurnos.css';

const ProximosTurnos = (props) => {
    const turnos = props.turnos;
    let [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(new Date().setHours(0,0,0,0)))
    let turnosFiltrados = turnos.filter( (fecha) => new Date(fecha.fechaHora).toDateString() === fechaSeleccionada.toDateString() )

    const filtrarTurnos = (fecha) => {
        setFechaSeleccionada(fecha)
    }

    // Si los turnos cambian, entonces filtra de vuelta los turnos
    useEffect(() => {
    }, [turnos, fechaSeleccionada])

    return (
        <Card sx={{width: "100%", height: "fit-content"}} className="ProximosTurnos" >
            <CardHeader title="Turnos Próximos"></CardHeader>
            {
                turnos.length !== 0 ?
                (
                    <CalendarioMensualTurnos soloNuevos turnos={turnos} eventoSeleccionarFecha={filtrarTurnos} />
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
