import { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import UserMenu from "../../components/UserMenu/UserMenu.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
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
            <header className="entorno-header">
                <div className="entorno-header-spacer"></div>
                <UserMenu />
            </header>
        
            <main className="entorno-main-content">
                <Outlet />
            </main>
        </div>
    </div>
  );
};

export default EntornoUsuario;
