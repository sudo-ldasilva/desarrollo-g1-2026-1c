import {useState, useEffect} from 'react'
import CalendarioMensualTurnos from "../calendarioMensualTurnos/CalendarioMensualTurnos.jsx"
import TurnoInfo from "../turnoInfo/TurnoInfo.jsx"

import { Card, CardHeader } from '@mui/material';

import './ProximosTurnos.css';

const ProximosTurnos = (props) => {
    const turnos = props.turnos;
    let [turnosFiltrados, setTurnosFiltrados] = useState([])
    let [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(new Date().setHours(0,0,0,0)))

    const filtrarTurnos = () => {
        setTurnosFiltrados(turnos.filter( (fecha) => fecha.fechaHora.toDateString() === fechaSeleccionada.toDateString() ))
    }

    const filtrarTurnosHandler = (fecha) => {
        setFechaSeleccionada(fecha)
        // filtrarTurnos() // NO VA ACÁ. Para eso está useEffect porque el set es asincrónico
    }

    // Si los turnos cambian, entonces filtra de vuelta los turnos
    useEffect(() => {
        filtrarTurnos()
    }, [turnos, fechaSeleccionada])

    return (
        <Card sx={{width: "100%"}} className="ProximosTurnos" >
            <CardHeader title="Turnos Próximos"></CardHeader>
            <CalendarioMensualTurnos soloNuevos turnos={turnos} eventoSeleccionarFecha={filtrarTurnosHandler} />

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
