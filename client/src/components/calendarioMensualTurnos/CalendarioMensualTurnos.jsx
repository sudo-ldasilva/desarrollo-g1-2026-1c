// https://coreui.io/react/docs/components/calendar/
import { CCalendar } from '@coreui/react-pro'
import '@coreui/coreui-pro/dist/css/coreui.min.css'; // css para el calendario

import { Card, CardHeader } from '@mui/material';

import './CalendarioMensualTurnos.css';

const CalendarioMensualTurnos = (props) => {
    const startDate = "2024/02/13"
    const turnos = [
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 15),
            color: 'brown',
        },
        {
            date: new Date(2024, 1, 20),
            color: 'blue',
        },
        {
            date: new Date(2024, 1, 27),
            color: 'green',
        },
    ]

    return (
        <Card sx={{width: "100%"}}>
            <CardHeader title="CalendarioMensualTurnos"></CardHeader>

            <div style={{width: "100%"}}>
                <CCalendar
                    className="border rounded w-100"
                    locale="es-AR"
                    startDate={startDate}
                    onStartDateChange={props.eventoSeleccionarFecha}
                    renderDayCell={(date: Date, meta: any) => {
                        // Fuente: https://coreui.io/react/docs/components/calendar/#custom-cell-rendering

                        // const isSelected = !!meta?.isSelected
                        const isInCurrentMonth = !!meta?.isInCurrentMonth
                        const dateParsed=date.toLocaleDateString('en-US', { day: '2-digit' })

                        const turnosDelDia = turnos.filter( (turno) => turno.date.getTime() === date.getTime() )
                        return (
                            <div className="py-1">
                                <div>{dateParsed}</div>

                                <div className="day">
                                    {
                                        turnosDelDia.map( (turno) => (
                                            <div
                                                // className={ isSelected ? 'text-reset' : true && !isInCurrentMonth ? 'text-body-tertiary opacity-75' : 'text-body-tertiary'}
                                                style={{
                                                    fontSize: '1rem',
                                                    color: turno ? turno.color : "transparent"
                                                }}
                                            >
                                                •
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }}
                />

            </div>
        </Card>
    )
};

export default CalendarioMensualTurnos;
