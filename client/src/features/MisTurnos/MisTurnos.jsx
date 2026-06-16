import { Card, CardContent, Box } from '@mui/material';
import HistorialTurnos from '../../components/HistorialTurnos/HistorialTurnos';
import './MisTurnos.css';

const MisTurnos = ({turnos}) => {
    return (
        <div>
            <section className="dashboard-block">
                <div className="dashboard-block-header">
                    <h2 className="dashboard-block-title">Mis turnos</h2>
                    <p className="dashboard-block-subtitle">Consultar los turnos del usuario.</p>
                </div>
            </section>

            <HistorialTurnos turnos={turnos} />
        </div>
    );
};

export default MisTurnos;
