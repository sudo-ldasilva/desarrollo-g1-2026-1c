import { useState, useEffect } from "react";
import Dashboard from "../dashboard/Dashboard.jsx";
import MisTurnos from "../MisTurnos/MisTurnos.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useLogto } from "@logto/react";
import { useNavigate, Navigate } from "react-router-dom";
import { getTurnos } from "../../services/TurnosService.jsx";
import { getMe } from "../../services/PerfilService.jsx";

import "./EntornoUsuario.css";

const EntornoUsuario = () => {
    const [estadoPerfil, setEstadoPerfil] = useState("LOADING");
    const [turnos, setTurnos] = useState([]);
    const { signOut, isAuthenticated, isLoading, getAccessToken} = useLogto();
    const navigate = useNavigate();

    console.log("ENTORNO USUARIO (/app)")

    useEffect(() => {
        const cargar = async () => {
        const token = await getAccessToken("https://api-sweet-medical.com");
        const data = await getTurnos(token);
        setTurnos(data);
        };

        if (isAuthenticated) {
        cargar();
        }
    }, [isAuthenticated, getAccessToken]);

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

	return (
		<div className="layout-entorno">
		    <Sidebar />
		    <div className="contenido-principal">
		        <p>EntornoUsuario</p>
		        <button
		            onClick={() =>{ console.log("CLICKEO SIGN OUT"); signOut(`http://localhost:3000`)}}
		            className="boton-signOut"
		        >
		            Cerrar Sesión
		        </button>
		        <Dashboard
                    turnos={turnos}
		            turnosPreseleccionados={turnosPreseleccionados}
		            confirmarReserva={confirmarReserva}
		        />
		        <MisTurnos turnos={turnos}/>
		    </div>
		</div>
	);
};

export default EntornoUsuario;
