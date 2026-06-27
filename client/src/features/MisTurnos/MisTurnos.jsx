import { Card, CardContent, Box } from '@mui/material';
import HistorialTurnos from '../../components/HistorialTurnos/HistorialTurnos';
import './MisTurnos.css';

const MisTurnos = ({turnos}) => {
    return (
        <div>
            <HistorialTurnos turnos={turnos} />
        </div>
    );
};

export default MisTurnos;
