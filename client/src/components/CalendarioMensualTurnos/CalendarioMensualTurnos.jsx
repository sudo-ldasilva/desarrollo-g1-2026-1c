import { useEffect } from 'react';
import { CCalendar } from '@coreui/react-pro';
import '@coreui/coreui-pro/dist/css/coreui.min.css';
import { Skeleton } from '@mui/material';
import './CalendarioMensualTurnos.css';

const CalendarioMensualTurnos = ({ 
    conteos = {}, 
    cargando, 
    turnoSeleccionado, 
    eventoSeleccionarFecha, 
    className, 
    eventoCambiarMes, 
    eventosCargados,
    soloNuevos 
}) => {
    const now = new Date();
    const startDate = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`;

    useEffect(() => { }, [conteos]);

    return (
        <div className={className}>
            <CCalendar
                className="rounded w-100"
                locale="es-AR"
                startDate={startDate}
                minDate={soloNuevos ? startDate : undefined}
                selectAdjacementDays={true}
                onStartDateChange={eventoSeleccionarFecha}
                onCalendarDateChange={eventoCambiarMes}
                renderDayCell={(date, meta) => {
                    const isDisabled = !!meta?.isDisabled;
                    const isToday = !!meta?.isToday;
                    const dateParsed = date.toLocaleDateString('en-US', { day: '2-digit' });
                    
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const dateKey = `${year}-${month}-${day}`;
                    
                    const cantidad = conteos[dateKey] || 0;
                    const hayTurnos = cantidad > 0 && !isDisabled;

                    return (
                        <div style={{ padding: "0.25rem 0.25rem 0.25rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.5rem" }}>
                            <div style={{
                                fontSize: "1.1rem",
                                lineHeight: "1.2",
                                alignSelf: "center",
                                ...(isToday && {
                                    backgroundColor: "var(--rojo-principal)",
                                    color: "white",
                                    borderRadius: "0.25rem",
                                    padding: "0.05rem 0.2rem",
                                    display: "inline-block",
                                })
                            }}>
                                {dateParsed}
                            </div>
                            
                            {cargando ? (
                                <Skeleton variant="rounded" height="1.5rem" />
                            ) : hayTurnos ? (
                                <div className="day">
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: "white",
                                        width: '1.5rem',
                                        height: '1.5rem',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "var(--rojo-principal)",
                                        borderRadius: "50%",
                                        border: "1px solid white", 
                                    }}>
                                        {cantidad}
                                    </div>
                                </div>
                            ) : (
                                // Si no hay turnos, renderizamos un espacio vacio para mantener la alineacion
                                <div style={{ height: '1.5rem' }} />
                            )}
                        </div>
                    );
                }}
            />
            <p className="CalendarioMensualTurno_calendario_info">Seleccione un día para mostrar los turnos</p>
        </div>
    );
};

export default CalendarioMensualTurnos;
