import { Card, CardHeader, CardContent, Button, Alert } from '@mui/material';
import TurnoInfo from '../turnoInfo/TurnoInfo.jsx';

import './ConfirmarPreseleccion.css';

const ConfirmarPreseleccion = ({turnosPreseleccionados, confirmarReserva}) => {
    return (
        <Card className="ConfirmarPreseleccion_card">
            <CardHeader title="Turnos Pre-Seleccionados"></CardHeader>
            <CardContent className="ConfirmarPreseleccion_content">


                {
                    turnosPreseleccionados.length !== 0 ?
                    (
                        <div className="ConfirmarPreseleccion">
                            {
                                turnosPreseleccionados.map( (turno) => (
                                    <TurnoInfo key={turno.id} turno={turno} />
                                ))
                            }
                            <Button
                                className="ConfirmarPreseleccion_button"
                                variant="contained"
                                onClick={confirmarReserva}
                            >
                                Confirmar reserva
                            </Button>
                        </div>
                    ) : (
                        <Alert severity="info">No hay turnos pre-seleccionados. Para solicitar turnos, diríjase a la pestaña "Solicitar turno"</Alert>
                    )
                }

            </CardContent>
        </Card>
    )
};

export default ConfirmarPreseleccion;
