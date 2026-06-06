import { Card, CardHeader, CardContent, Button } from '@mui/material';
import TurnoInfo from '../turnoInfo/TurnoInfo.jsx';

import './ConfirmarPreseleccion.css';

const ConfirmarPreseleccion = (props) => {
    return (
        <Card sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
            <div>
                <CardHeader title="Confirmar Pre-selección"></CardHeader>
                <CardContent className="ConfirmarPreseleccion_turnos">
                    {
                        props.turnosPreseleccionados.map( (turno) => (
                            <TurnoInfo turno={turno} />
                        ))
                    }
                </CardContent>
            </div>

        <Button
            style={{
                width: "100%",
            }}
            variant="contained"
        >
            Confirmar reserva
        </Button>
        </Card>
    )
};

export default ConfirmarPreseleccion;
