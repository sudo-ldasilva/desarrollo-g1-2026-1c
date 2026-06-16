import { Box } from "@mui/material";

import EstadisticaTurnos from "../../components/EstadisticaTurnos/EstadisticaTurnos.jsx";
import ProximosTurnos from "../../components/ProximosTurnos/ProximosTurnos.jsx";
import "./Dashboard.css";

const Dashboard = () => {
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
                <ProximosTurnos />
            </Box>
        </div>
    );
};

export default Dashboard;
