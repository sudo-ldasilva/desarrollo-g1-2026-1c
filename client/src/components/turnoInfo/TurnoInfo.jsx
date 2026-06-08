import { Card, CardHeader, CardContent } from '@mui/material';

import './TurnoInfo.css';

const TurnoInfo = (props) => {
    const turno = props.turno

    return (
        <Card className="TurnoInfo_card">
            <CardHeader title={turno.servicio.nombre}></CardHeader>
            <CardContent>
                { turno.estado && <p>{turno.estado}</p> }
                <p>Con <b>{turno.medico.nombre}</b> en la sede <b>{turno.sede.nombre}</b> el <b>{turno.fechaHora}</b></p>
                <p>Costo: ${turno.costo}</p>
            </CardContent>
        </Card>
    )
};

export default TurnoInfo;
