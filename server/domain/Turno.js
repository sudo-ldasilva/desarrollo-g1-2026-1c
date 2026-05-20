import { EstadoTurno } from "./EstadoTurno.js";
import CambioEstadoTurno from "./CambioEstadoTurno.js";
import FactoryNotificacion from "./FactoryNotificacion.js";

class Turno {
    constructor({medico, fechaHora, sede, servicio }) {
        
        if (!medico || !fechaHora || !sede || !servicio) {
            throw new Error(
                "El Turno requiere: medico, fechaHora, sede, servicio. " +
                `Recibido: medico=${medico}, fechaHora=${fechaHora}, sede=${sede}, servicio=${servicio}`
            );
        }

        this.medico = medico;
        this.fechaHora = fechaHora;
        this.sede = sede;
        this.servicio = servicio;

        //valores no indispensables para que el turno exista
        this.paciente = null;
        this.estado = EstadoTurno.DISPONIBLE;
        this.historialEstados = [];
        this.costo = null;
    }

    asignarPaciente(paciente) {
        this.paciente = paciente;
    }

    definirCosto(monto) {
        this.costo = monto;
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

        if (!this.paciente) {
            throw new Error("No se puede recordar un turno sin paciente asignado");
        }

        const factoryNotificacion = new FactoryNotificacion();
        const notificacion = factoryNotificacion.crearSegunEstadoTurno(this);

        return notificacion; // TODO Qué hacer con la notificación? Como se la pueda enviar al medico Y al paciente?
    }
}

export default Turno;
