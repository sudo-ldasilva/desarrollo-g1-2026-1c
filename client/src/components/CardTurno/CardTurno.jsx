import { useState } from 'react';
import './CardTurno.css';

const CardTurno = ({ turno }) => {
    const [estado, setEstado] = useState(turno.estado || 'RESERVADO');

    const horaTurno = new Date(turno.fechaHora);
    const ahora = new Date();
    const diferenciaEnMilisegundos = horaTurno - ahora;
    const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);

    const estaEnHora = diferenciaEnHoras >= 1;
    const puedeCancelar = estado === "RESERVADO" && estaEnHora;

    const manejarCancelacion = () => {
        if (puedeCancelar) {
            setEstado('CANCELADO'); 
            alert(`Turno de ${turno.servicio} cancelado con éxito.`);
        }
    };

    return (
        <div className="listado-card">
            <div className={`turno-card ${estado.toLowerCase()}`}>
                <div className="turno-header">
                    <h3 className="turno-servicio">{turno.servicio}</h3>
                    <span className={`turno-estado ${estado.toLowerCase()}`}>{estado}</span>
                </div>
                <p className="turno-medico">Dr/a. {turno.medico.nombre} (M.N. {turno.medico.matricula})</p>
                <p className="turno-sede">Sede: {turno.sede.nombre}</p>
                
                <div className="turno-detalles">
                    <div className="turno-costo">
                        {turno.costo === 0 ? "Cubierto Totalmente" : `$${turno.costo.toLocaleString("es-AR")}`}
                    </div>
                    <div className='turno-hora'>
                        {horaTurno.toLocaleDateString("es-AR")} - {horaTurno.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' })} hs
                    </div>
                </div>

                <button 
                    onClick={manejarCancelacion} 
                    disabled={!puedeCancelar} 
                    className='btn-cancelar btn-derecha'
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default CardTurno;