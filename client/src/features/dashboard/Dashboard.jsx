import { Box } from '@mui/material';

import EstadisticaTurnos from '../../components/estadisticaTurnos/EstadisticaTurnos.jsx';
import ProximosTurnos from '../../components/proximosTurnos/ProximosTurnos.jsx';
import ConfirmarPreseleccion from '../../components/confirmarPreseleccion/ConfirmarPreseleccion.jsx';
import './Dashboard.css';

const Dashboard = (props) => {
    return (
        <div className="content">
            <EstadisticaTurnos className="estadisticas" />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 5,
              }}
            >
                <ProximosTurnos turnos={props.turnos} />
                <ConfirmarPreseleccion turnosPreseleccionados={props.turnosPreseleccionados} />
            </Box>
        </div>
    )
};

export default Dashboard;
