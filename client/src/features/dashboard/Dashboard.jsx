import { Box } from "@mui/material";

import EstadisticaTurnos from "../../components/estadisticaTurnos/EstadisticaTurnos.jsx";
import ProximosTurnos from "../../components/proximosTurnos/ProximosTurnos.jsx";
import ConfirmarPreseleccion from "../../components/confirmarPreseleccion/ConfirmarPreseleccion.jsx";
import "./Dashboard.css";

const Dashboard = ({turnos, turnosPreseleccionados, confirmarReserva}) => {
    return (
        <div className="dashboard-shell">
            <section className="dashboard-block">
                <div className="dashboard-block-header">
                    <h2 className="dashboard-block-title">Resumen</h2>
                    <p className="dashboard-block-subtitle">Una vista rápida del estado general de tus turnos.</p>
                </div>
                <EstadisticaTurnos className="dashboard-stats" />
            </section>

            <Box
                className="dashboard-panels"
                sx={{
                    width: "100%",
                    display: "flex",
                    gap: 3,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <Box sx={{ flex: "1 1 520px", minWidth: 0 }}>
                    <ProximosTurnos />
                </Box>

                <Box sx={{ flex: "1 1 360px", minWidth: 0 }}>
                    <ConfirmarPreseleccion
                        turnosPreseleccionados={turnosPreseleccionados}
                        confirmarReserva={confirmarReserva}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default Dashboard;