import {useState, useEffect} from 'react'
import Dashboard from "../dashboard/Dashboard.jsx"
import MisTurnos from '../MisTurnos/MisTurnos.jsx';

import './EntornoUsuario.css';

const EntornoUsuario = () => {
    // TURNOS PRESELECCIONADOS (carrito)
    const [turnosPreseleccionados, setTurnosPreseleccionados] = useState([]);

    // TODO De ejemplo. Eliminar
    useEffect(() => setTurnosPreseleccionados([
        {
            servicio: "Dermatologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
        {
            servicio: "Cardiologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
        {
            servicio: "Oftalmologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
    ]), []);

    // TURNOS DEL USUARIO
    const [turnos, setTurnos] = useState([]);

    useEffect(() => setTurnos([
        // TODO Obtener de la BD
        {
            servicio: "Cardiologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: new Date("2026-06-15T11:30:00")
        },
        {
            servicio: "Oftalmologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: new Date("2026-06-12T11:30:00")
        },
        {
            servicio: "Dermatologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: new Date("2026-06-15T11:30:00")
        }
    ]), []);

    return (
        <>
            <Dashboard turnosPreseleccionados={turnosPreseleccionados} turnos={turnos} />
            <MisTurnos />
        </>
    )
};

export default EntornoUsuario;
