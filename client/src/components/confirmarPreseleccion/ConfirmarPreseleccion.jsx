import { Card, CardHeader, CardContent, Button } from '@mui/material';
import TurnoPreseleccion from '../turnoPreseleccion/TurnoPreseleccion.jsx';

import './ConfirmarPreseleccion.css';

const ConfirmarPreseleccion = () => {
    const turnos = [
        {
            servicio: "Dermatologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
        {
            servicio: "Cardiologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
        {
            servicio: "Oftalmologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
    ]

    return (
        <Card sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
            <div>
                <CardHeader title="Confirmar Pre-selección"></CardHeader>
                <CardContent>
                    {
                        turnos.map( (turno) => (
                            <TurnoPreseleccion turno={turno} />
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
