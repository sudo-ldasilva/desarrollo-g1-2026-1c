// https://coreui.io/react/docs/components/calendar/
import { CCalendar } from '@coreui/react-pro'
import '@coreui/coreui-pro/dist/css/coreui.min.css'; // css para el calendario

import { Card, CardHeader } from '@mui/material';

import './CalendarioMensualTurnos.css';

const CalendarioMensualTurnos = (props) => {
    const startDate = "2024/02/13"
    const turnos = [
        new Date(2024, 1, 15),
        new Date(2024, 1, 15),
        new Date(2024, 1, 15),
        new Date(2024, 1, 15),
        new Date(2024, 1, 15),
        new Date(2024, 1, 15),
        new Date(2024, 1, 15),
        new Date(2024, 1, 15),
        new Date(2024, 1, 20),
        new Date(2024, 1, 27),
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

                        const turnosDelDia = turnos.filter( (turno) => turno.getTime() === date.getTime() )
                        const hayTurnos = turnosDelDia.length > 0
                        return (
                            <div className="py-1">
                                <div style={{fontSize:"1.2rem"}}>{dateParsed}</div>

                                <div className="day">
                                    <div
                                        // className={ isSelected ? 'text-reset' : true && !isInCurrentMonth ? 'text-body-tertiary opacity-75' : 'text-body-tertiary'}
                                        style={{
                                            fontSize: '0.75rem',
                                            color: "white",
                                            width: '1.5rem',
                                            height: '1.5rem',
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: hayTurnos ? "red" : undefined,
                                            borderRadius: hayTurnos ? "50%" : undefined,
                                            border: hayTurnos ? "1px solid white" : undefined,
                                        }}
                                    >
                                        {hayTurnos != 0 ? turnosDelDia.length : ""}
                                    </div>
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
