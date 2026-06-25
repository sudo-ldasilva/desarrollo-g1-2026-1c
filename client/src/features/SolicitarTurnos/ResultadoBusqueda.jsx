import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, Alert, Skeleton } from '@mui/material';
import CalendarioMensualTurnos from '../../components/CalendarioMensualTurnos/CalendarioMensualTurnos.jsx';
import TurnoGrupo from '../../components/TurnoGrupo/TurnoGrupo.jsx';
import ConfirmarReservaDialog from '../../components/ConfirmarReservaDialog/ConfirmarReservaDialog.jsx';
import { buscarTurnosDisponibles, reservarTurno } from '../../services/TurnosService.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import './ResultadoBusqueda.css';

const ResultadoBusqueda = () => {
    const { isAuthenticated, getAccessToken } = useAuth();
    const [searchParams] = useSearchParams();

    const tipoServicio = searchParams.get("tipoServicio") || "";
    const servicioId = searchParams.get("servicio") || "";
    const sedeId = searchParams.get("sede") || "";

    const hoy = new Date();
    const [turnos, setTurnos] = useState([]);
    const [calendarioActualizado, setCalendarioActualizado] = useState(false);
    const mesCalendario = useRef(hoy);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(hoy.setHours(0, 0, 0, 0)));
    const [reservando, setReservando] = useState(new Set());
    const [resultado, setResultado] = useState(null);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

    const handleAgregar = (turno) => {
        setResultado(null);
        setTurnoSeleccionado(turno);
    };

    const handleConfirmarReserva = async () => {
        const turno = turnoSeleccionado;
        if (!turno || reservando.has(turno._id)) return;
        setReservando(prev => new Set(prev).add(turno._id));
        setResultado(null);
        try {
            const accessToken = await getAccessToken(
                process.env.REACT_APP_LOGTO_RESOURCES
            );
            await reservarTurno(accessToken, turno._id);
            setTurnos(prev => prev.filter(t => t._id !== turno._id));
            setResultado("success");
        } catch {
            setResultado("error");
        } finally {
            setReservando(prev => { const next = new Set(prev); next.delete(turno._id); return next; });
        }
    };

    const handleCancelarReserva = () => {
        setResultado(null);
        setTurnoSeleccionado(null);
    };

    const turnosFiltrados = turnos.filter(
        t => new Date(t.fechaHora).toDateString() === fechaSeleccionada.toDateString()
    );

    const agruparTurnos = (lista) => {
        const grupos = {};
        lista.forEach(t => {
            const key = `${t.servicio._id}|${t.medico._id}|${t.sede._id}|${new Date(t.fechaHora).toDateString()}`;
            if (!grupos[key]) grupos[key] = [];
            grupos[key].push(t);
        });
        return Object.values(grupos);
    };

    const filtrarTurnos = (fecha) => {
        setFechaSeleccionada(fecha);
    };

    const cambiarMesCalendario = (mes) => {
        mesCalendario.current = mes;
        setCalendarioActualizado(false);
    };

    useEffect(() => {
        if (calendarioActualizado) return;
        if (!servicioId) return;

        const abortController = new AbortController();
        let ignore = false;

        const obtenerTurnos = async () => {
            try {
                if (!isAuthenticated) return;

                const accessToken = await getAccessToken(
                    process.env.REACT_APP_LOGTO_RESOURCES
                );

                if (!accessToken) return;

                const year = mesCalendario.current.getFullYear();
                const month = mesCalendario.current.getMonth();

                const fechaInicio = new Date(year, month - 1, 1);
                const fechaFin = new Date(year, month + 1, 0, 23, 59, 59);

                const baseParams = {
                    tipoServicio,
                    servicio: servicioId,
                    fechaInicio,
                    fechaFin,
                    limit: 25,
                };
                if (sedeId) {
                    baseParams.sede = sedeId;
                }

                let pagina = 1;
                let totalPaginas = -1;
                let todosLosTurnos = [];

                do {
                    const data = await buscarTurnosDisponibles(
                        accessToken,
                        { ...baseParams, page: pagina },
                        abortController.signal
                    );

                    if (ignore) return;

                    todosLosTurnos.push(...data.turnos);
                    totalPaginas = data.totalPages;
                    pagina = data.page + 1;
                } while (pagina <= totalPaginas);

                if (!ignore) {
                    setTurnos(todosLosTurnos);
                    setCalendarioActualizado(true);
                }
            } catch {
                // Component may be unmounting
            }
        };

        obtenerTurnos();
        return () => {
            ignore = true;
            abortController.abort();
        };
    }, [calendarioActualizado, isAuthenticated, getAccessToken, tipoServicio, servicioId, sedeId]);

    return (
        <div className="solicitar-root">
            <section className="dashboard-block">
                <div className="dashboard-block-header">
                    <h2 className="dashboard-block-title">Resultado de búsqueda</h2>
                    <p className="dashboard-block-subtitle">Turnos disponibles.</p>
                </div>
            </section>

            <div className="resultado-grid">
                <Card className="resultado-calendario">
                    <CardContent>
                        {servicioId ? (
                            <CalendarioMensualTurnos
                                className="w-100"
                                soloNuevos
                                turnos={turnos}
                                eventoSeleccionarFecha={filtrarTurnos}
                                eventoCambiarMes={cambiarMesCalendario}
                                eventosCargados={calendarioActualizado}
                            />
                        ) : (
                            <Alert severity="info">No se recibieron parámetros de búsqueda.</Alert>
                        )}
                    </CardContent>
                </Card>

                <Card className="resultado-turnos">
                    <CardContent className="resultado-turnos-content">
                        <h3 className="resultado-turnos-title">
                            Turnos del {fechaSeleccionada.toLocaleDateString("es-AR")}
                        </h3>
                        {calendarioActualizado ? (
                            turnosFiltrados.length > 0 ? (
                                agruparTurnos(turnosFiltrados).map(grupo => (
                                    <TurnoGrupo
                                        key={grupo[0]._id || grupo[0].id}
                                        turnos={grupo}
                                        onAgregar={handleAgregar}
                                    />
                                ))
                            ) : (
                                <Alert severity="info">
                                    No hay turnos disponibles para el día seleccionado.
                                </Alert>
                            )
                        ) : (
                            <Skeleton variant="rounded" height={100} />
                        )}
                    </CardContent>
                </Card>

                <ConfirmarReservaDialog
                    open={!!turnoSeleccionado}
                    turno={turnoSeleccionado}
                    reservando={turnoSeleccionado ? reservando.has(turnoSeleccionado._id) : false}
                    resultado={resultado}
                    onConfirm={handleConfirmarReserva}
                    onCancel={handleCancelarReserva}
                />
            </div>
        </div>
    );
};

export default ResultadoBusqueda;
