// https://coreui.io/react/docs/components/calendar/
import {useEffect} from 'react'
import { CCalendar } from '@coreui/react-pro'
import '@coreui/coreui-pro/dist/css/coreui.min.css'; // css para el calendario

import './CalendarioMensualTurnos.css';

const CalendarioMensualTurnos = ({turnos, soloNuevos, eventoSeleccionarFecha, className, eventoCambiarMes}) => {
    const now = new Date()
    const startDate = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`;

    useEffect( () => { }, [turnos])

    return (
        <div className={className}>
            <CCalendar
                className="border rounded w-100"
                locale="es-AR"
                startDate={startDate}
                minDate={soloNuevos ? startDate : undefined}
                onStartDateChange={eventoSeleccionarFecha}
                onCalendarDateChange={eventoCambiarMes}
                renderDayCell={(date: Date, meta: any) => {
                    // Fuente: https://coreui.io/react/docs/components/calendar/#custom-cell-rendering

                    // const isSelected = !!meta?.isSelected
                    // const isInCurrentMonth = !!meta?.isInCurrentMonth
                    const isDisabled = !!meta?.isDisabled
                    const dateParsed=date.toLocaleDateString('en-US', { day: '2-digit' })

                    const turnosDelDia = turnos.filter( (turno) => new Date(turno.fechaHora).setHours(0,0,0,0) === date.getTime())
                    const hayTurnos = turnosDelDia.length > 0 && !isDisabled
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
                                        backgroundColor: hayTurnos ? "var(--rojo-principal)" : undefined,
                                        borderRadius: hayTurnos ? "50%" : undefined,
                                        border: hayTurnos ? "1px solid white" : undefined,
                                    }}
                                >
                                    {hayTurnos ? turnosDelDia.length : ""}
                                </div>
                            </div>
                        </div>
                    )
                }}
            />
            <p className="CalendarioMensualTurno_calendario_info">Seleccione un día para mostrar los turnos</p>
        </div>
    )
};

export default CalendarioMensualTurnos;
