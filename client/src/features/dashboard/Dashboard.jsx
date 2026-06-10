import { Box } from '@mui/material';

import EstadisticaTurnos from '../../components/estadisticaTurnos/EstadisticaTurnos.jsx';
import ProximosTurnos from '../../components/proximosTurnos/ProximosTurnos.jsx';
import ConfirmarPreseleccion from '../../components/confirmarPreseleccion/ConfirmarPreseleccion.jsx';
import './Dashboard.css';

const Dashboard = ({turnos, turnosPreseleccionados, confirmarReserva}) => {
    return (
        <div className="content">
            <EstadisticaTurnos className="estadisticas" turnos={turnos} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 5,
              }}
            >
                <ProximosTurnos turnos={turnos} />
                <ConfirmarPreseleccion turnosPreseleccionados={turnosPreseleccionados} confirmarReserva={confirmarReserva} />
            </Box>
        </div>
    )
};

export default Dashboard;
