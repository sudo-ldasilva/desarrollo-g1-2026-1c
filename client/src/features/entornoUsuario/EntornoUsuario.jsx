import { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useLogto } from "@logto/react";
import { useNavigate } from "react-router-dom";
import "./EntornoUsuario.css";

const EntornoUsuario = () => {
    const { signOut, isAuthenticated, isLoading } = useLogto();
    const navigate = useNavigate();
    const location = useLocation();

    // Si no está autenticado, vuelve al inicio
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/");
        }
    }, [isLoading, isAuthenticated, navigate]);

    // Turnos preseleccionados (estado compartido para el carrito)
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
        <div className="layout-entorno">
            <Sidebar />
            <div className="contenido-principal">
                <button
                    onClick={() => signOut(`${window.location.origin}/`)}
                    className="boton-signOut"
                >
                    Cerrar Sesión
                </button>
                
                {/* Outlet renderiza el componente de la ruta hija que matchee */}
                <Outlet context={{ turnosPreseleccionados, confirmarReserva }} />
            </div>
        </div>
    );
};

export default EntornoUsuario;
