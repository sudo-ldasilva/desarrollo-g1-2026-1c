import { Card, CardContent, Box, Pagination, Skeleton, Alert } from '@mui/material';
import {useState, useEffect, useRef} from 'react'
import CardTurno from '../../components/CardTurno/CardTurno';
import './MisTurnos.css';
import { useAuth } from "../../hooks/useAuth.jsx";
import {getTurnosPaginados} from "../../services/TurnosService.jsx"

const MisTurnos = () => {
    const turnosPorPagina = 5
    const { isAuthenticated, getAccessToken } = useAuth();
    const [indice, setIndice] = useState(1)
    const [turnos, setTurnos] = useState(null)
    const contentRef = useRef()

    useEffect( () => {
        const descargarBD = async () => {
            setTurnos(null)
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
        <div className="historial-container" ref={contentRef}>
            {
                turnos === null ? (
                    <>
                        <Skeleton variant="rounded" height="200px" />
                        <Skeleton variant="rounded" height="200px" />
                        <Skeleton variant="rounded" height="200px" />
                    </>
                ) : (
                        turnos.total === 0 ? (
                            <Alert severity="info">Todavía no tenes turnos</Alert>
                        ) : (
                            <>
                                {
                                    turnos.turnos.map((turno) => (
                                        <CardTurno key={turno._id || turno.id} turno={turno} />
                                    ))
                                }
                                <Box display="flex" justifyContent="center">
                                    <Pagination margin="auto" width="100%" page={indice} count={turnos.totalPages} color="primary" onChange={pepe} />
                                </Box>
                            </>
                        )
                )
            }
        </div>
    );
};

export default MisTurnos;
