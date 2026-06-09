import { Card, CardContent, Container } from '@mui/material';
import HistorialTurnos from '../../components/HistorialTurnos/HistorialTurnos';
import './MisTurnos.css';

const MisTurnos = ({turnos}) => {
    return (
        <Container className='contenedor-misTurnos'>
            <Card className='card-turno'>
                <CardContent>
                    <h2 className='titulo-misTurnos'>
                        Mis Turnos
                    </h2>
                    <HistorialTurnos turnos={turnos} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default MisTurnos;
