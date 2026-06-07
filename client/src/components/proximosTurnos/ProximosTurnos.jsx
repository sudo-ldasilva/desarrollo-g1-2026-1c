import {useState, useEffect} from 'react'
import CalendarioMensualTurnos from "../calendarioMensualTurnos/CalendarioMensualTurnos.jsx"
import TurnoInfo from "../turnoInfo/TurnoInfo.jsx"

import { Card, CardHeader } from '@mui/material';

import './ProximosTurnos.css';

const ProximosTurnos = (props) => {
    const turnos = props.turnos;
    let [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(new Date().setHours(0,0,0,0)))
    let turnosFiltrados = turnos.filter( (fecha) => fecha.fechaHora.toDateString() === fechaSeleccionada.toDateString() )

    const filtrarTurnos = (fecha) => {
        setFechaSeleccionada(fecha)
    }

    // Si los turnos cambian, entonces filtra de vuelta los turnos
    useEffect(() => {
    }, [turnos, fechaSeleccionada])

    return (
        <Card sx={{width: "100%"}} className="ProximosTurnos" >
            <CardHeader title="Turnos Próximos"></CardHeader>
            <CalendarioMensualTurnos soloNuevos turnos={turnos} eventoSeleccionarFecha={filtrarTurnos} />

            <div className="ProximosTurnos_turnos">
                {
                    turnosFiltrados.length !== 0 ?
                        (
                            turnosFiltrados.map( (turno) => (
                                <TurnoInfo key={turno.id} turno={turno} />
                            ))
                        ) :
                        (
                            <div>
                                Nada por acá, nada por allá
                            </div>
                        )
                }
            </div>
        </Card>
    )
};

export default ProximosTurnos;
