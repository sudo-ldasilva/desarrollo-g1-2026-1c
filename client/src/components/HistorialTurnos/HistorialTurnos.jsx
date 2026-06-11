import './HistorialTurnos.css';
import CardTurno from '../CardTurno/CardTurno';

export default function HistorialTurnos({ turnos }) {

    if (!Array.isArray(turnos) || turnos.length === 0) {
        return <p className="listado-vacio">No tenés un historial de turnos activos.</p>;
    }

    return (
        <div className="historial-container">
            {turnos.map((turno) => (
                <CardTurno key={turno._id || turno.id} turno={turno} />
            ))}
        </div>
    );
}
