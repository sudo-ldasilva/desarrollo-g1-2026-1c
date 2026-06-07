// import CardActions from '@mui/material/CardActions';
import {useEffect} from 'react'
import { CardHeader, CardContent, Box, Card, Skeleton } from '@mui/material';

import './EstadisticaTurnos.css';

const EstadisticaTurnos = ({className, turnos}) => {
    // Dentro de valor tendríamos que usar variables que se creen con
    // useState, y setHook para que se actualize EstadisticaTurnos
    //
    // Dentro de cada card debe de haber una funcion que se encargue
    // de calcular las estadísticas
    const cards = [
        { titulo: "Proximos Turnos esta semana", valor: -1},
        { titulo: "Proximos Turnos este mes", valor: -1},
        { titulo: "Turnos del ultimo mes", valor: -1},
        { titulo: "Turnos realizados", valor: -1},
    ]

    useEffect(() => {
        // TODO Actualiza estadisticas de las cards
    }, [turnos])

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
                    cards.map(({titulo, valor}) => (
                        <Card key={titulo} sx={{width: "100%"}}>
                            <CardHeader className="EstadisticaTurnos_title" title={titulo}></CardHeader>
                            <CardContent className="EstadisticaTurnos_content">{valor}</CardContent>
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
