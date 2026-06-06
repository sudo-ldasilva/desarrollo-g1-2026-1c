import { Card, CardHeader, CardContent } from '@mui/material';

import './TurnoInfo.css';

const TurnoInfo = (props) => {
    const turno = props.turno

    return (
        <Card className="TurnoInfo_card">
            <CardHeader title={turno.servicio}></CardHeader>
            <CardContent>
                <p>Con <b>{turno.medico}</b> en la sede <b>{turno.sede}</b> el <b>{turno.fechaHora.toString()}</b></p>
                <p>{turno.cobertura}</p>
                <p></p>
            </CardContent>
        </Card>
    )
};

export default TurnoInfo;
