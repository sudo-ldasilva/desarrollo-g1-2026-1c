import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

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
                    <Card
                        className="dashboard-solicitar-card"
                        onClick={() => navigate("/app/solicitar-turnos")}
                    >
                        <CardContent className="dashboard-solicitar-card-content">
                            <div>
                                <div className="dashboard-solicitar-btn-primary">Solicitar turno</div>
                                <div className="dashboard-solicitar-btn-secondary">Agendá un turno médico</div>
                            </div>
                            <MedicalServicesIcon className="dashboard-solicitar-icon" />
                        </CardContent>
                    </Card>
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
