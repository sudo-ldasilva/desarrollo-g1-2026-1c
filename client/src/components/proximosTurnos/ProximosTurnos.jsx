import CalendarioMensualTurnos from "../calendarioMensualTurnos/CalendarioMensualTurnos.jsx"
import TurnoInfo from "../turnoInfo/TurnoInfo.jsx"

import { Card, CardHeader } from '@mui/material';

import './ProximosTurnos.css';

const ProximosTurnos = (props) => {
    const turnos = props.turnos;

    return (
        <Card sx={{width: "100%"}} className="ProximosTurnos" >
            <CardHeader title="Turnos Próximos"></CardHeader>
            <CalendarioMensualTurnos soloNuevos turnos={turnos} />

            <div className="ProximosTurnos_turnos">
                {
                    turnos.map( (turno) => (
                        <TurnoInfo turno={turno} />
                    ))
                }
            </div>
        </Card>
    )
};

export default ProximosTurnos;
