import { Box } from '@mui/material';

import EstadisticaTurnos from '../../components/estadisticaTurnos/EstadisticaTurnos.jsx';
import ProximosTurnos from '../../components/proximosTurnos/ProximosTurnos.jsx';
import ConfirmarCarrito from '../../components/confirmarCarrito/ConfirmarCarrito.jsx';
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
                <ConfirmarCarrito />
            </Box>
        </>
    )
};

export default Dashboard;
