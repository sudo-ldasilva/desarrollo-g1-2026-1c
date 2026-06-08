// import CardActions from '@mui/material/CardActions';
import {useEffect, useState} from 'react'
import { CardHeader, CardContent, Box, Card, Skeleton } from '@mui/material';
import { getCantidadTurnosEnRangoFecha } from "../../services/TurnosService.jsx";

import './EstadisticaTurnos.css';

const EstadisticaTurnos = ({className, turnos}) => {
    const [estadisticas, setEstadisticas] = useState({
        proximos7Dias: -1,
        proximoMes: -1,
        previoMes: -1,
        reservados: -1,
    });

    useEffect( () => {
        const obtenerDatos = async () => {
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
                getCantidadTurnosEnRangoFecha(hoy, siguienteSemana),
                getCantidadTurnosEnRangoFecha(hoy, siguienteMes),
                getCantidadTurnosEnRangoFecha(hoy, anteriorMes),
                Promise.resolve(0) // TODO
            ])

            setEstadisticas({
                proximos7Dias,
                proximoMes,
                previoMes,
                reservados
            })
        };

        obtenerDatos();
    }, []);

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
        <Box
            sx={{
                width: "100%",
                display: "flex",
                gap: 5,
            }}
            className={className}
        >
            {
                cards.map(({titulo, valor}) => (
                    valor !== -1 ? (
                        <Card key={titulo} sx={{width: "100%"}}>
                            <CardHeader className="EstadisticaTurnos_title" title={titulo}></CardHeader>
                            <CardContent className="EstadisticaTurnos_content">{valor}</CardContent>
                        </Card>
                    ) : (
                        <Skeleton variant="rounded" height="150px" width="100%" />
                    )
                ))
            }
        </Box>
    );
};

export default EstadisticaTurnos;
