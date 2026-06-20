import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import EstadisticaTurnos from "../../components/EstadisticaTurnos/EstadisticaTurnos.jsx";
import ProximosTurnos from "../../components/ProximosTurnos/ProximosTurnos.jsx";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-shell">
            <section className="dashboard-block">
                <div className="dashboard-block-header">
                    <div>
                        <h2 className="dashboard-block-title">Resumen</h2>
                        <p className="dashboard-block-subtitle">Una vista rápida del estado general de tus turnos.</p>
                    </div>
                </div>
                <div className="dashboard-stats-row">
                    <Card
                        className="dashboard-solicitar-card"
                        onClick={() => navigate("/app/solicitar-turnos")}
                    >
                        <CardContent className="dashboard-solicitar-card-content">
                            <CalendarMonthIcon className="dashboard-solicitar-icon" />
                            <div>
                                <div className="dashboard-solicitar-btn-primary">Solicitar nuevo turno</div>
                                <div className="dashboard-solicitar-btn-secondary">Agendá un turno médico</div>
                            </div>
                        </CardContent>
                    </Card>
                    <EstadisticaTurnos className="dashboard-stats" />
                </div>
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
