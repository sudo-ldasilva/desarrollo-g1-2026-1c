import { useState, useEffect } from "react";
import Dashboard from "../dashboard/Dashboard.jsx";
import MisTurnos from "../MisTurnos/MisTurnos.jsx";
import { useLogto } from "@logto/react";
import { useNavigate } from "react-router-dom";

import "./EntornoUsuario.css";

const EntornoUsuario = () => {
    const { signOut, isAuthenticated, isLoading } = useLogto();
    const navigate = useNavigate();

    // Si no está autenticado, vuelve al inicio
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/");
        }
    }, [isLoading, isAuthenticated, navigate]);

    // Turnos
    const [turnosPreseleccionados, setTurnosPreseleccionados] = useState([]);

    // TODO Datos de ejemplo. Eliminar luego.
    useEffect(() => {
        setTurnosPreseleccionados([
            {
                id: 1,
                servicio: {nombre: "Dermatologia"},
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "15/6/2026 - 11:30 a. m. hs",
            },
            {
                id: 2,
                servicio: {nombre: "Cardiologia"},
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: "15/6/2026 - 11:30 a. m. hs",
            },
            {
                id: 3,
                servicio: {nombre: "Oftalmologia"},
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
                onClick={() => signOut(`${window.location.origin}/`)}
                className="boton-signOut"
            >
                Cerrar Sesión
            </button>

            <Dashboard
                turnosPreseleccionados={turnosPreseleccionados}
                confirmarReserva={confirmarReserva}
            />

            <MisTurnos />
        </>
    );
};

export default EntornoUsuario;
