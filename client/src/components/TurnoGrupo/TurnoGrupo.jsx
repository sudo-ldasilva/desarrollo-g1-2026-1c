import { Card, CardContent } from '@mui/material';

import './TurnoGrupo.css';

const TurnoGrupo = ({ turnos, onAgregar }) => {
    const turno = turnos[0];

    const fecha = new Date(turno.fechaHora);
    const dia = fecha.toLocaleDateString("es-AR", { weekday: "long" });
    const numero = fecha.toLocaleDateString("es-AR", { day: "numeric" });
    const mes = fecha.toLocaleDateString("es-AR", { month: "long" });
    const diaCap = dia.charAt(0).toUpperCase() + dia.slice(1);
    const mesCap = mes.charAt(0).toUpperCase() + mes.slice(1);

    return (
        <Card className="TurnoGrupo_card">
            <CardContent className="TurnoGrupo_content">
                <h3 className="TurnoGrupo_titulo">{turno.servicio.nombre}</h3>

                <hr className="TurnoGrupo_divisor" />

                <p className="TurnoGrupo_body-row TurnoGrupo_medico">{turno.medico.nombre}</p>

                <p className="TurnoGrupo_body-row">
                    {diaCap} {numero} de {mesCap}
                </p>

                <p className="TurnoGrupo_body-row">{turno.sede.nombre}</p>
                <p className="TurnoGrupo_body-row">{turno.sede.direccion}</p>

                <div className="TurnoGrupo_horarios">
                    {turnos.map(t => {
                        const hora = new Date(t.fechaHora).toLocaleTimeString("es-AR", {
                            hour: "2-digit", minute: "2-digit", hour12: false
                        });
                        return (
                            <button
                                key={t._id}
                                className="TurnoGrupo_chip"
                                onClick={() => onAgregar(t)}
                            >
                                {hora}
                            </button>
                        );
                    })}
                </div>

                <hr className="TurnoGrupo_divisor" />

                <div className="TurnoGrupo_footer">
                    <span className="TurnoGrupo_costo">
                        {turno.costo === 0
                            ? "Cubierto totalmente"
                            : `$${turno.costo.toLocaleString("es-AR")}`
                        }
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default TurnoGrupo;
