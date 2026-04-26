import { EstadoTurno } from "./EstadoTurno.js";
import CambioEstadoTurno from "./CambioEstadoTurno.js";
import FactoryNotificacion from "./FactoryNotificacion.js";

class Turno {
    constructor({ id, medico, paciente, fechaHora, sede, practica, estado, costo }) {
        this.id = id; //al "nacer" siempre tendrá un id, no admite nulo, al igual que el médico. UUID -> es un identificador unico universal, sin repetirse
        this.medico = medico;
        this.paciente = paciente; 
        this.fechaHora = fechaHora;
        this.sede = sede;
        this.practica = practica;
        this.estado = estado;
        this.costo = costo;
        this.historialEstados = []; 
    } 

    actualizarEstado(nuevoEstado, quien, motivo) {
        if (this.estado === nuevoEstado) return;

        const cambio = new CambioEstadoTurno(new Date(), nuevoEstado, this, quien, motivo);
        this.historialEstados.push(cambio);

        this.estado = nuevoEstado;
        
        const factoryNotificacion = new FactoryNotificacion();
        const notificacion = factoryNotificacion.crearSegunEstadoTurno(this);

        return notificacion; // TODO Qué hacer con la notificación? Como se la pueda enviar al medico y/o al paciente?
    }

    recordarTurno() {
        const factoryNotificacion = new FactoryNotificacion();
        const notificacion = factoryNotificacion.crearSegunEstadoTurno(this);

        return notificacion; // TODO Qué hacer con la notificación? Como se la pueda enviar al medico Y al paciente?
    }
}

export default Turno;
