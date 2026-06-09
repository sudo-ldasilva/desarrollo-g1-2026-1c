import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";
import "./CompletarPerfil.css";

import { crearPerfil, getMe } from "../../services/PerfilService.jsx";

const CompletarPerfil = () => {

    const navigate = useNavigate();
    const { getAccessToken } = useLogto();
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    console.log("COMPLETAR PERFIL");

    const [form, setForm] = useState({
        nombre: "",
        dni: "",
        // obraSocial: "",
        // plan: ""
    });

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setError("");

        try {
        const token = await getAccessToken("https://api-sweet-medical.com");

        await crearPerfil(token, form);

        navigate("/callback", { replace: true });
        } catch (submitError) {
        setError("No se pudo completar el perfil. Revisá los datos e intentá otra vez.");
        } finally {
        setGuardando(false);
        }
    };

    return (
        <div className="completar-perfil-container">
            <div className="completar-perfil-backdrop completar-perfil-backdrop-left" />
            <div className="completar-perfil-backdrop completar-perfil-backdrop-right" />

            <div className="completar-perfil-card">
                <div className="completar-perfil-badge">Perfil pendiente</div>
                <h1 className="completar-perfil-title">Completar perfil</h1>
                <p className="completar-perfil-subtitle">
                    Necesitamos estos datos para habilitar tu entorno de usuario.
                </p>

                {error && (
                    <div className="completar-perfil-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="completar-perfil-form">
                    <label className="completar-perfil-field">
                        <span>Nombre y apellido</span>
                        <input
                            name="nombre"
                            placeholder="Ej: Juan Pérez"
                            autoComplete="name"
                            onChange={handleChange}
                        />
                    </label>

                    <label className="completar-perfil-field">
                        <span>DNI</span>
                        <input
                            name="dni"
                            placeholder="Ej: 12345678"
                            inputMode="numeric"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </label>

                    <div className="completar-perfil-note">
                        Este paso es necesario para continuar a tu panel y ver tus turnos.
                    </div>

                    <div className="completar-perfil-actions">
                        <button
                            type="submit"
                            className="completar-perfil-button"
                            disabled={guardando}
                        >
                            {guardando ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompletarPerfil;