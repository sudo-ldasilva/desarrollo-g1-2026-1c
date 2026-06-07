import {useState} from 'react'
import { Card, CardHeader, CardContent, Button } from '@mui/material';
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
                        <div>
                            Nada por acá, nada por allá
                        </div>
                    )
                }

            </CardContent>
        </Card>
    )
};

export default ConfirmarPreseleccion;
