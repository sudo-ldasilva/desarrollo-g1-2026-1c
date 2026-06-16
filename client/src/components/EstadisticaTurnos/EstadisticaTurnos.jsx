// import CardActions from '@mui/material/CardActions';
import {useEffect, useState} from 'react'
import { CardHeader, CardContent, Box, Card, Skeleton, Typography } from '@mui/material';
import { useAuth } from "../../hooks/useAuth.jsx"
import { getCantidadTurnosEnRangoFecha, getCantidadTurnosEnEstado } from "../../services/TurnosService.jsx";
import './EstadisticaTurnos.css';

const EstadisticaTurnos = ({className, turnos}) => {
    const { isAuthenticated, getAccessToken } = useAuth();

    const [estadisticas, setEstadisticas] = useState({
        proximos7Dias: -1,
        proximoMes: -1,
        previoMes: -1,
        reservados: -1,
    });

    useEffect( () => {
        const abortController = new AbortController();
        let ignore = false;

        const obtenerDatos = async () => {
            try {
                if (!isAuthenticated) return;

                const accessToken = await getAccessToken(
                   process.env.REACT_APP_LOGTO_RESOURCES
                );

                if (!accessToken) return;

                const hoy = new Date()

                const siguienteSemana = new Date();
                siguienteSemana.setDate(hoy.getDate() + 7);

                const siguienteMes = new Date(
                    hoy.getFullYear(),
                    hoy.getMonth() + 1,
                    0,
                    23,
                    59,
                    59
                );

                const anteriorMes = new Date(
                    hoy.getFullYear(),
                    hoy.getMonth() - 1,
                    0,
                    23,
                    59,
                    59
                );

                const [
                    proximos7Dias,
                    proximoMes,
                    previoMes,
                    reservados,
                ] = await Promise.all([
                    getCantidadTurnosEnRangoFecha(accessToken, hoy, siguienteSemana, abortController.signal),
                    getCantidadTurnosEnRangoFecha(accessToken, hoy, siguienteMes, abortController.signal),
                    getCantidadTurnosEnRangoFecha(accessToken, anteriorMes, hoy, abortController.signal),
                    getCantidadTurnosEnEstado(accessToken, "RESERVADO", abortController.signal),
                ])

                if (!ignore) {
                    setEstadisticas({
                        proximos7Dias,
                        proximoMes,
                        previoMes,
                        reservados
                    })
                }
            } catch {
                // Component may be unmounting during sign-out
            }
        };

        obtenerDatos();
        return () => {
            ignore = true;
            abortController.abort();
        };
    }, [isAuthenticated, getAccessToken]);

    const cards = [
        {
            titulo: "Turnos de los próximos 7 días",
            valor: estadisticas.proximos7Dias
        },
        {
            titulo: "Proximos turnos este mes",
            valor: estadisticas.proximoMes
        },
        {
            titulo: "Turnos del ultimo mes",
            valor: estadisticas.previoMes
        },
        {
            titulo: "Turnos reservados",
            valor: estadisticas.reservados
        },
    ]

    return (
        <Box className={"EstadisticaTurnos " + className}>
            {
                cards.map(({titulo, valor}) => (
                    valor !== -1 ? (
                        <Card className="EstadisticaTurnos_card" key={titulo}>
                            <CardContent className="EstadisticaTurnos_content">
                                <Typography className="EstadisticaTurnos_title" gutterBottom variant="h5" component="div">
                                    {titulo}
                                </Typography>
                                <div className="EstadisticaTurnos_valor">{valor}</div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Skeleton className="EstadisticaTurnos_card" variant="rounded" width="100%" height="100%" />
                    )
                ))
            }
        </Box>
    );
};

export default EstadisticaTurnos;
