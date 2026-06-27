import { Card, CardContent, Box } from '@mui/material';
import {useState, useEffect, useRef} from 'react'
import CardTurno from '../../components/CardTurno/CardTurno';
import './MisTurnos.css';
import { useAuth } from "../../hooks/useAuth.jsx";
import {getTurnos} from "../../services/TurnosService.jsx"

const MisTurnos = () => {
    const { isAuthenticated, getAccessToken } = useAuth();

    const [turnos, setTurnos] = useState([])

    useEffect( () => {
        const descargarBD = async () => {
            const accessToken = await getAccessToken(
              process.env.REACT_APP_LOGTO_RESOURCES
            );

            const turnosDescargados = await getTurnos(accessToken)
            setTurnos(turnosDescargados)
        }

        descargarBD();
    }, [getAccessToken])

    return (
        <div className="historial-container">
            {
                turnos.length === 0 ? (
                    <p className="listado-vacio">No tenés un historial de turnos activos.</p>
                ) : (
                    turnos.map((turno) => (
                        <CardTurno key={turno._id || turno.id} turno={turno} />
                    ))
                )
            }
        </div>
    );
};

export default MisTurnos;
