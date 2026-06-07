// import CardActions from '@mui/material/CardActions';
import { CardHeader, CardContent, Box, Card } from '@mui/material';

import './EstadisticaTurnos.css';

const EstadisticaTurnos = ({className}) => {
    // Dentro de valor tendríamos que usar variables que se creen con
    // useState, y setHook para que se actualize EstadisticaTurnos
    const cards = [
        { titulo: "Proximos Turnos esta semana", valor: 2},
        { titulo: "Proximos Turnos este mes", valor: 15},
        { titulo: "Turnos del ultimo mes", valor: 50},
        { titulo: "Turnos realizados", valor: 1150},
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
                    <Card key={titulo} sx={{width: "100%"}}>
                        <CardHeader className="EstadisticaTurnos_title" title={titulo}></CardHeader>
                        <CardContent className="EstadisticaTurnos_content">{valor}</CardContent>
                    </Card>
                ))
            }
        </Box>
    );
};

export default EstadisticaTurnos;
