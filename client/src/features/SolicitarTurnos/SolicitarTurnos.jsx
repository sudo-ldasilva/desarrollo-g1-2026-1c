import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card, CardContent,
    Radio, RadioGroup, FormControlLabel, FormControl, FormLabel
} from '@mui/material';
import { getEspecialidades, getPracticas, getSedes } from '../../services/CatalogosService';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { useAuth } from '../../hooks/useAuth.jsx';
import './SolicitarTurnos.css';

const initialFormState = {
    tipoServicio: "",
    servicioSeleccionado: "",
    sedeSeleccionada: "",
    serviciosDisponibles: [],
    sedes: []
};

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_TIPO_SERVICIO":
            return {
                ...state,
                tipoServicio: action.value,
                servicioSeleccionado: "",
                serviciosDisponibles: []
            };
        case "SET_SERVICIOS":
            return { ...state, serviciosDisponibles: action.value };
        case "SET_SERVICIO":
            return { ...state, servicioSeleccionado: action.value };
        case "SET_SEDES":
            return { ...state, sedes: action.value };
        case "SET_SEDE":
            return { ...state, sedeSeleccionada: action.value };
        default:
            return state;
    }
};

const SolicitarTurnos = ({ agregarAlCarrito, carrito }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(formReducer, initialFormState);
    const { getIdTokenClaims, isAuthenticated } = useAuth();
    const [pacienteNombre, setPacienteNombre] = useState("");

    const {
        tipoServicio, servicioSeleccionado,
        sedeSeleccionada, serviciosDisponibles, sedes
    } = state;

    const servicioNombre = serviciosDisponibles.find(
        s => s._id === servicioSeleccionado
    )?.nombre || "";

    const sedeNombre = sedes.find(
        s => s._id === sedeSeleccionada
    )?.nombre || "";

    const puedeBuscar = tipoServicio !== "" && servicioSeleccionado !== "";

    useEffect(() => {
        (async () => {
            if (!isAuthenticated) return;
            try {
                const claims = await getIdTokenClaims();
                if (claims) {
                    setPacienteNombre(claims.name || claims.username || "");
                }
            } catch(error) {
                console.log(error)
            }
        })();
    }, [isAuthenticated, getIdTokenClaims]);

    useEffect(() => {
        const abortController = new AbortController();
        let ignore = false;

        getSedes()
            .then(data => { if (!ignore) dispatch({ type: "SET_SEDES", value: data }); })
            .catch(() => { if (!ignore) alert("Error al cargar las sedes."); });

        return () => {
            ignore = true;
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        if (!tipoServicio) return;

        const abortController = new AbortController();
        let ignore = false;

        const fetchServicios = tipoServicio === "Especialidad" ? getEspecialidades : getPracticas;

        fetchServicios()
            .then(data => { if (!ignore) dispatch({ type: "SET_SERVICIOS", value: data }); })
            .catch(() => { if (!ignore) alert("Error al cargar los servicios."); });

        return () => {
            ignore = true;
            abortController.abort();
        };
    }, [tipoServicio]);

    const handleBuscar = () => {
        if (!puedeBuscar) return;

        const params = new URLSearchParams();
        params.set("tipoServicio", tipoServicio);
        params.set("servicio", servicioSeleccionado);
        if (sedeSeleccionada && sedeSeleccionada !== "__todas__") {
            params.set("sede", sedeSeleccionada);
        }

        navigate(`/app/solicitar-turnos/resultado?${params.toString()}`);
    };

    const getStepStatus = (index) => {
        if (index === 0) return tipoServicio ? "completo" : "proceso";
        if (index === 1) return servicioSeleccionado ? "completo" : (tipoServicio ? "proceso" : "pendiente");
        if (index === 2) return sedeSeleccionada ? "completo" : (servicioSeleccionado ? "proceso" : "pendiente");
        return "pendiente";
    };

    const steps = [
        {
            label: "Tipo de Servicio",
            value: tipoServicio,
        },
        {
            label: "Servicio",
            value: servicioNombre,
        },
        {
            label: "Sede",
            value: sedeSeleccionada ? (sedeNombre || "Todas las sedes") : "",
        }
    ].map((s, i) => ({
        ...s,
        status: getStepStatus(i),
        isCompleted: getStepStatus(i) === "completo",
        isActive: getStepStatus(i) === "proceso"
    }));

    return (
        <div className="solicitar-root">
            <section className="dashboard-block">
                <div className="dashboard-block-header">
                    <h2 className="dashboard-block-title">Solicitar turno</h2>
                    <p className="dashboard-block-subtitle">Completá los filtros y buscá disponibilidad.</p>
                </div>
            </section>

            <div className="filtros-grid">
                <Card className="filtros-panel">
                    <CardContent className="filtros-card-content">
                        <div className="filtro-section">
                            <span className="filtro-label">Elegir tipo de servicio</span>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    value={tipoServicio}
                                    onChange={(e) => dispatch({ type: "SET_TIPO_SERVICIO", value: e.target.value })}
                                >
                                    <FormControlLabel value="Especialidad" control={<Radio />} label="Especialidad" />
                                    <FormControlLabel value="Practica" control={<Radio />} label="Práctica" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="filtro-section">
                            <span className="filtro-label">Elegir servicio</span>
                            <CustomSelect
                                value={servicioSeleccionado}
                                onChange={(e) => dispatch({ type: "SET_SERVICIO", value: e.target.value })}
                                placeholder="Seleccioná un servicio"
                                options={serviciosDisponibles.map(srv => ({ value: srv._id, label: srv.nombre }))}
                                disabled={!tipoServicio}
                            />
                        </div>

                        <div className="filtro-section">
                            <span className="filtro-label">Elegir sede</span>
                            <CustomSelect
                                value={sedeSeleccionada}
                                onChange={(e) => {
                                    dispatch({ type: "SET_SEDE", value: e.target.value });
                                }}
                                placeholder="Seleccioná una sede"
                                options={[
                                    { value: "__todas__", label: "Todas las sedes" },
                                    ...sedes.map(s => ({ value: s._id, label: s.nombre }))
                                ]}
                                disabled={!servicioSeleccionado}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="stepper-panel">
                    <CardContent className="stepper-card-content">
                        <h3 className="stepper-title">
                            Nuevo turno para paciente <span className="stepper-paciente">{pacienteNombre}</span>
                        </h3>

                        <div className="custom-stepper">
                            {steps.map((step, index) => {
                                const statusText = step.isCompleted ? "completo" : (step.isActive ? "en proceso" : "pendiente");
                                const stateClass = step.isCompleted ? "completed" : (step.isActive ? "active" : "pending");
                                return (
                                    <React.Fragment key={index}>
                                        <div className="step-wrapper">
                                            <div className="step-indicator-wrapper">
                                                <div className={`step-circle ${stateClass}`}>
                                                    {step.isCompleted ? (
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    ) : (
                                                        <span className="step-number">{index + 1}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="step-body">
                                                <div className={`step-meta ${stateClass}`}>
                                                    Paso {index + 1}: {statusText}
                                                </div>
                                                <div className={`step-title ${stateClass}`}>{step.label}</div>
                                            </div>
                                        </div>

                                        {(index < steps.length - 1 || step.value) && (
                                            <div className="step-value-row">
                                                <div className="value-line-wrapper">
                                                    <div className={`value-line ${step.isCompleted ? 'completed' : ''}`} />
                                                </div>
                                                {step.value && (
                                                    <div className="step-value">{step.value}</div>
                                                )}
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <div className="buscar-button-container">
                            <button
                                className="solicitar-button"
                                disabled={!puedeBuscar}
                                onClick={handleBuscar}
                            >
                                Buscar disponibilidad
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SolicitarTurnos;
