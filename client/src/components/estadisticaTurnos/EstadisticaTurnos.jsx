// import CardActions from '@mui/material/CardActions';
import {useEffect} from 'react'
import { CardHeader, CardContent, Box, Card, Skeleton } from '@mui/material';

import './EstadisticaTurnos.css';

const EstadisticaTurnos = ({className, turnos}) => {
    const hoy = new Date()

    const cards = [
        {
            titulo: "Turnos de los próximos 7 días",
            obtenerValor: () => {
                const limite = new Date()
                limite.setDate(hoy.getDate() + 7)

                return turnos.filter( (turno) => hoy < new Date(turno.fechaHora) && new Date(turno.fechaHora) <= limite ).length
            }
        },
        {
            titulo: "Proximos turnos este mes",
            obtenerValor: () => {
                console.log(turnos)
                const finDeMes = new Date(
                    hoy.getFullYear(),
                    hoy.getMonth() + 1,
                    0,
                    23,
                    59,
                    59
                );

                return turnos.filter( (turno) => hoy < new Date(turno.fechaHora) && new Date(turno.fechaHora) <= finDeMes
                ).length;
            }
        },
        {
            titulo: "Turnos del ultimo mes",
            obtenerValor: () => {
                const finDeMes = new Date(
                    hoy.getFullYear(),
                    hoy.getMonth() - 1,
                    0,
                    23,
                    59,
                    59
                );

                return turnos.filter( (turno) => hoy < new Date(turno.fechaHora) && new Date(turno.fechaHora) <= finDeMes
                ).length;
            }
        },
        {
            titulo: "Turnos realizados",
            obtenerValor: () => turnos.filter( (turno) => new Date(turno.fechaHora) < hoy).length
        },
    ]

    useEffect(() => { }, [turnos])

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
                turnos.length !== 0 ?
                (
                    cards.map(({titulo, obtenerValor}) => (
                        <Card key={titulo} sx={{width: "100%"}}>
                            <CardHeader className="EstadisticaTurnos_title" title={titulo}></CardHeader>
                            <CardContent className="EstadisticaTurnos_content">{obtenerValor()}</CardContent>
                        </Card>
                    ))
                ) : (
                    cards.map(() => (
                        <Skeleton variant="rounded" height="150px" width="100%" />
                    ))
                )
            }
        </Box>
    );
};

export default EstadisticaTurnos;
