import {useState, useEffect} from 'react'
import Dashboard from "../dashboard/Dashboard.jsx"
import MisTurnos from '../MisTurnos/MisTurnos.jsx';

import './EntornoUsuario.css';

const EntornoUsuario = () => {
    // TURNOS PRESELECCIONADOS (carrito)
    const [turnosPreseleccionados, setTurnosPreseleccionados] = useState([]);

    /////// TODO De ejemplo. Eliminar
    useEffect(() => setTurnosPreseleccionados([
        {
            id: 1,
            servicio: "Dermatologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
        {
            id: 2,
            servicio: "Cardiologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "15/6/2026 - 11:30 a. m. hs"
        },
        {
            id: 3,
            servicio: "Oftalmologia",
            medico: "Dr. Gomez",
            sede: "Palermo",
            cobertura: "Cubierto Totalmente",
            fechaHora: "5/6/2026 - 11:30 a. m. hs"
        },
    ]), []);

    const confirmarReserva = () => {
        setTurnosPreseleccionados([])
        alert("Seleccionados!")
    }

    /////// TURNOS DEL USUARIO
    const [turnos, setTurnos] = useState([]);

    // TODO Esto debería ir en un Service que se conecte con la BD
    const bd = () => {
        return new Promise(r => setTimeout(() => r([
            // TODO Obtener de la BD
            {
                id: 1,
                servicio: "Cardiologia",
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: new Date("2026-06-15T11:30:00")
            },
            {
                id: 2,
                servicio: "Oftalmologia",
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: new Date("2026-06-07T11:30:00")
            },
            {
                id: 3,
                servicio: "Dermatologia",
                medico: "Dr. Gomez",
                sede: "Palermo",
                cobertura: "Cubierto Totalmente",
                fechaHora: new Date("2026-06-15T11:30:00")
            }
        ]), 2000));
    }

    useEffect(() => {
        const cargarTurnosDesdeLaBD = async () => {
            const turnosBD = await bd();
            setTurnos(turnosBD)
        }

        cargarTurnosDesdeLaBD(); // A React no le gusta que la función que le paso al useEffect sea async,
                                 // asi que necesito crear una función auxiliar y llamarla desde acá
    });

    return (
        <>
            <Dashboard turnosPreseleccionados={turnosPreseleccionados} turnos={turnos} confirmarReserva={confirmarReserva} />
            <MisTurnos />
        </>
    )
};

export default EntornoUsuario;
