import { Card, CardHeader, CardContent } from '@mui/material';

import './TurnoPreseleccion.css';

const TurnoPreseleccion = (props) => {
    const turno = props.turno

    return (
        <Card sx={{width: "100%"}}>
            <CardHeader title={turno.servicio}></CardHeader>
            <CardContent>
                <p>Con <b>{turno.medico}</b> en la sede <b>{turno.sede}</b> el <b>{turno.fechaHora}</b></p>
                <p>{turno.cobertura}</p>
                <p></p>
            </CardContent>
        </Card>
    )
};

export default TurnoPreseleccion;
