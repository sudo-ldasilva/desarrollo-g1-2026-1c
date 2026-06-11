import { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Dashboard from "../../features/dashboard/Dashboard.jsx";
import { useLogto } from "@logto/react";
import { useNavigate } from "react-router-dom";
import "./EntornoUsuario.css";

const EntornoUsuario = () => {
    const [estadoPerfil, setEstadoPerfil] = useState("LOADING");
    const { signOut, isAuthenticated, isLoading, getAccessToken} = useLogto();
    const navigate = useNavigate();
    const location = useLocation();

    console.log("ENTORNO USUARIO (/app)")

	return (
		<div className="layout-entorno">
		    <Sidebar />
		    <div className="contenido-principal">
		        <button
		            onClick={() =>{ console.log("CLICKEO SIGN OUT"); signOut(`http://localhost:3000`)}}
		            className="boton-signOut"
		        >
		            Cerrar Sesión
		        </button>

                        <Outlet />
		    </div>
		</div>
	);
};

export default EntornoUsuario;
