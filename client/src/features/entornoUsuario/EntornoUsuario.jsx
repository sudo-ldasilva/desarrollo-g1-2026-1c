import { useState, useEffect } from "react";
import Dashboard from "../dashboard/Dashboard.jsx";
import MisTurnos from "../MisTurnos/MisTurnos.jsx";
import { useLogto } from "@logto/react";
import { useNavigate } from "react-router-dom";

import "./EntornoUsuario.css";

const EntornoUsuario = () => {
    const { signOut, isAuthenticated, isLoading } = useLogto();
    const navigate = useNavigate();

    // Estados
    const [turnos, setTurnos] = useState([]);
    const [turnosPreseleccionados, setTurnosPreseleccionados] = useState([]);

    // TODO Esto debería ir en un Service que se conecte con la BD
    const bd = () => {
        return new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve([
                        {
                            id: 1,
                            servicio: "Cardiologia",
                            medico: "Dr. Gomez",
                            sede: "Palermo",
                            cobertura: "Cubierto Totalmente",
                            fechaHora: new Date("2026-06-15T11:30:00"),
                        },
                        {
                            id: 2,
                            servicio: "Oftalmologia",
                            medico: "Dr. Gomez",
                            sede: "Palermo",
                            cobertura: "Cubierto Totalmente",
                            fechaHora: new Date("2026-06-07T11:30:00"),
                        },
                        {
                            id: 3,
                            servicio: "Dermatologia",
                            medico: "Dr. Gomez",
                            sede: "Palermo",
                            cobertura: "Cubierto Totalmente",
                            fechaHora: new Date("2026-06-15T11:30:00"),
                        },
                    ]),
                2000
            )
        );
    };

    // Si no está autenticado, vuelve al inicio
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/");
        }
    }, [isLoading, isAuthenticated, navigate]);

    // Carga de turnos desde la "BD"
    useEffect(() => {
        const cargarTurnosDesdeLaBD = async () => {
            const turnosBD = await bd();
            setTurnos(turnosBD);
        };

        cargarTurnosDesdeLaBD();
    }, []);

    // TODO Datos de ejemplo. Eliminar luego.
    useEffect(() => {
        setTurnosPreseleccionados([
            {
                id: 1,
                servicio: "Dermatologia",
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "15/6/2026 - 11:30 a. m. hs",
            },
            {
                id: 2,
                servicio: "Cardiologia",
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "15/6/2026 - 11:30 a. m. hs",
            },
            {
                id: 3,
                servicio: "Oftalmologia",
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "5/6/2026 - 11:30 a. m. hs",
            },
        ]);
    }, []);

    const confirmarReserva = () => {
        setTurnosPreseleccionados([]);
        alert("¡Seleccionados!");
    };

    if (isLoading) {
        return <div>Cargando la aplicación...</div>;
    }

    return (
        <>
            <p>EntornoUsuario</p>

            <button
                onClick={() => signOut("http://localhost:3000/")}
                className="boton-signOut"
            >
                Cerrar Sesión
            </button>

            <Dashboard
                turnosPreseleccionados={turnosPreseleccionados}
                turnos={turnos}
                confirmarReserva={confirmarReserva}
            />

            <MisTurnos />
        </>
    );
};

export default EntornoUsuario;