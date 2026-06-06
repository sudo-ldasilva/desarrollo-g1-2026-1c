import { Box } from '@mui/material';

import EstadisticaTurnos from '../../components/estadisticaTurnos/EstadisticaTurnos.jsx';
import ProximosTurnos from '../../components/proximosTurnos/ProximosTurnos.jsx';
import ConfirmarPreseleccion from '../../components/confirmarPreseleccion/ConfirmarPreseleccion.jsx';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <>
            <p>Dashboard</p>
            <EstadisticaTurnos />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 5,
              }}
            >
                <ProximosTurnos />
                <ConfirmarPreseleccion />
            </Box>
        </>
    )
};

export default Dashboard;
