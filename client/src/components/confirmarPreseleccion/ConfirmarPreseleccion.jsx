import {useState} from 'react'
import { Card, CardHeader, CardContent, Button, Alert } from '@mui/material';
import TurnoInfo from '../turnoInfo/TurnoInfo.jsx';

import './ConfirmarPreseleccion.css';

const ConfirmarPreseleccion = ({turnosPreseleccionados, confirmarReserva}) => {
    useState( () => { }, [turnosPreseleccionados])

    return (
        <Card style={{width: "100%", height: "fit-content"}}>
            <CardHeader title="Turnos Pre-Seleccionados"></CardHeader>
            <CardContent style={{width: "100%"}}>


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
                                style={{
                                    margin: "1rem",
                                }}
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
