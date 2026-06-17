import { Card, CardContent } from '@mui/material';

import './TurnoInfo.css';

const TurnoInfo = ({ turno, onAgregar, onCancelar, onReprogramar }) => {
    const fecha = new Date(turno.fechaHora);
    const dia = fecha.toLocaleDateString("es-AR", { weekday: "long" });
    const numero = fecha.toLocaleDateString("es-AR", { day: "numeric" });
    const mes = fecha.toLocaleDateString("es-AR", { month: "long" });
    const diaCap = dia.charAt(0).toUpperCase() + dia.slice(1);
    const mesCap = mes.charAt(0).toUpperCase() + mes.slice(1);
    const hora = fecha.toLocaleTimeString("es-AR", {
        hour: "2-digit", minute: "2-digit", hour12: false
    });

    return (
        <Card className="TurnoInfo_card">
            <CardContent className="TurnoInfo_content">
                <h3 className="TurnoInfo_titulo">{turno.servicio.nombre}</h3>

                <hr className="TurnoInfo_divisor" />

                <p className="TurnoInfo_body-row TurnoInfo_medico">{turno.medico.nombre}</p>

                <p className="TurnoInfo_body-row">
                    {diaCap} {numero} de {mesCap} - <span className="TurnoInfo_hora">{hora}hs</span>
                </p>

                <p className="TurnoInfo_body-row">{turno.sede.nombre}</p>
                <p className="TurnoInfo_body-row">{turno.sede.direccion}</p>

                <hr className="TurnoInfo_divisor" />

                <div className="TurnoInfo_footer">
                    <span className="TurnoInfo_costo">
                        {turno.costo === 0
                            ? "Cubierto totalmente"
                            : `$${turno.costo.toLocaleString("es-AR")}`
                        }
                    </span>

                    <div className="TurnoInfo_acciones">
                        {onCancelar && (
                            <button className="TurnoInfo_btn TurnoInfo_btn-cancelar" onClick={onCancelar}>
                                Cancelar
                            </button>
                        )}
                        {onReprogramar && (
                            <button className="TurnoInfo_btn TurnoInfo_btn-reprogramar" onClick={onReprogramar}>
                                Reprogramar
                            </button>
                        )}
                        {onAgregar && (
                            <button className="TurnoInfo_btn TurnoInfo_btn-agendar" onClick={onAgregar}>
                                Agendar
                            </button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TurnoInfo;
