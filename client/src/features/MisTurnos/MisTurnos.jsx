import { Card, CardContent, Container } from '@mui/material';
import HistorialTurnos from '../../components/HistorialTurnos/HistorialTurnos';
import './MisTurnos.css';

const MisTurnos = () => {
    // MOCK DATA: Turnos de prueba estructurados exactamente como tu Schema de Mongo populado
    const turnosMock = [
        {
            _id: "t1",
            fechaHora: "2026-06-15T14:30:00Z", // Fecha futura (configurable para cancelación)
            medico: { nombre: "Gómez", matricula: "12345" },
            sede: { nombre: "Palermo" },
            servicio: "Electrocardiograma de reposo",
            estado: "RESERVADO",
            costo: 0
        },
        {
            _id: "t2",
            fechaHora: "2026-05-10T10:00:00Z", // Fecha pasada (No se puede cancelar por tiempo)
            medico: { nombre: "Fernández", matricula: "67890" },
            sede: { nombre: "Flores" },
            servicio: "Consulta Médica General",
            estado: "REALIZADO",
            costo: 2500
        }
    ];

    return (
        <Container className='contenedor-misTurnos'>
            <Card className='card-turno'>
                <CardContent>
                    <h2 className='titulo-misTurnos'>
                        Mis Turnos
                    </h2>
                    <HistorialTurnos turnos={turnosMock} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default MisTurnos;