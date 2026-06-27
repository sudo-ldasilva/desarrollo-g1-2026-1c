import { Card, CardContent, Box, Pagination } from '@mui/material';
import {useState, useEffect, useRef} from 'react'
import CardTurno from '../../components/CardTurno/CardTurno';
import './MisTurnos.css';
import { useAuth } from "../../hooks/useAuth.jsx";
import {getTurnosPaginados} from "../../services/TurnosService.jsx"

const MisTurnos = () => {
    const turnosPorPagina = 5
    const { isAuthenticated, getAccessToken } = useAuth();
    const [indice, setIndice] = useState(1)
    const [turnos, setTurnos] = useState({total: 0})

    useEffect( () => {
        const descargarBD = async () => {
            const accessToken = await getAccessToken(
              process.env.REACT_APP_LOGTO_RESOURCES
            );

            const turnosDescargados = await getTurnosPaginados(accessToken, indice, turnosPorPagina)
            setTurnos(turnosDescargados)
        }

        descargarBD();
    }, [getAccessToken, indice])

    const pepe = (e, valor) => {
        setIndice(valor)
    }

    return (
        <div className="historial-container">
            {
                turnos.total === 0 ? (
                    <p className="listado-vacio">No tenés un historial de turnos activos.</p>
                ) : (
                    <Card>
                        {
                            turnos.turnos.map((turno) => (
                                <CardTurno key={turno._id || turno.id} turno={turno} />
                            ))
                        }
                        <Pagination count={turnos.totalPages} color="primary" onChange={pepe} />
                    </Card>
                )
            }
        </div>
    );
};

export default MisTurnos;
