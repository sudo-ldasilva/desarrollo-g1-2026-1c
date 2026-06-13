import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";
import { getObrasSociales, getPlanesObraSocial } from "../../services/ObraSocialService.jsx";
import "./CompletarPerfil.css";
import { crearPerfil, getMe } from "../../services/PerfilService.jsx";

const CompletarPerfil = () => {
    const navigate = useNavigate();
    const { getAccessToken } = useLogto();
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [obrasSociales, setObrasSociales] = useState([]);
    const [planes, setPlanes] = useState([]);

    console.log("COMPLETAR PERFIL");

    const [form, setForm] = useState({
        nombre: "",
        dni: "",
        obraSocial: "",
        plan: ""
    });

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleObraSocialChange = async (e) => {
        const obraSocialId = e.target.value;

        setForm({
            ...form,
            obraSocial: obraSocialId,
            plan: ""
        });

        try {
            const planesData = await getPlanesObraSocial(obraSocialId);

            setPlanes(planesData);
        } catch (error) {
            console.error(error);
            setPlanes([]);
        }
    };

    useEffect(() => {
        const cargarObrasSociales = async () => {
            try {
                const data = await getObrasSociales();
                setObrasSociales(data);
            } catch (error) {
                console.error(error);
            }
        };

        cargarObrasSociales();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.nombre.trim() ||
            !form.dni.trim() ||
            !form.obraSocial ||
            !form.plan
        ) {
            setError("Debe completar todos los campos.");
            return;
        }

        setGuardando(true);
        setError("");

        try {
            const token = await getAccessToken("https://api-sweet-medical.com");

            await crearPerfil(token, form);

            navigate("/callback", { replace: true });

        } catch (submitError) {
            let mensajeError = "No se pudo completar el perfil. Revisá los datos e intentá otra vez.";
      
            //Axios adjunta la respuesta del servidor en submitError.response.data
            if (submitError.response?.data) {
                const data = submitError.response.data;
                
                if (data.errors && Array.isArray(data.errors)) {
                    // Caso 1: Errores de validación de Zod (ej. DNI con formato inválido)
                    mensajeError = data.errors.map(e => e.mensaje).join(" ");
                } else if (data.message) {
                    // Caso 2: Errores de aplicación controlados (ej. ConflictError por DNI duplicado)
                    mensajeError = data.message;
                }
            }
            
            setError(mensajeError);
        
        } finally {
            setGuardando(false);
        }
    }

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
                            required
                            placeholder="Ej: Juan Pérez"
                            autoComplete="name"
                            onChange={handleChange}
                        />
                    </label>

                    <label className="completar-perfil-field">
                        <span>DNI</span>
                        <input
                            name="dni"
                            required
                            placeholder="Ej: 12345678"
                            inputMode="numeric"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </label>

                    <label className="completar-perfil-field">
                        <span>Obra social</span>

                        <select
                            name="obraSocial"
                            required
                            value={form.obraSocial}
                            onChange={handleObraSocialChange}
                        >
                            <option value="">
                                Seleccione una obra social
                            </option>

                            {obrasSociales.map((obra) => (
                                <option
                                    key={obra._id}
                                    value={obra._id}
                                >
                                    {obra.nombre}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="completar-perfil-field">
                        <span>Plan</span>

                        <select
                            name="plan"
                            required
                            value={form.plan}
                            onChange={handleChange}
                            disabled={!form.obraSocial}
                        >
                            <option value="">
                                Seleccione un plan
                            </option>

                            {planes.map((plan) => (
                                <option
                                    key={plan._id}
                                    value={plan._id}
                                >
                                    {plan.nombre}
                                </option>
                            ))}
                        </select>
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
