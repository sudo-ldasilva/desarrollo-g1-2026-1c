import {EstadoTurno} from "./EstadoTurno.js";

class Turno {
    constructor({id, medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo}) {
        this.id = id; //al "nacer" siempre tendrá un id, no admite nulo, al igual que el médico. UUID -> es un identificador unico universal, sin repetirse
        this.medico = medico;
        this.paciente = paciente; //Al principio iniciará en null
        this.fechaHora = fechaHora; //también tendrá una fecha definida al principio
        this.sede = sede;
        this.practica = practica;
        this.estado = estado;
        this.historialEstados = historialEstados; // arrancaría como una lista vacía
        this.costo = costo;
    } 

    actualizarEstado(nuevoEstado, quien, motivo){
        if (this.estado == nuevoEstado) return;

        const cambio = new CambioEstadoTurno(new Date(), nuevoEstado, this, usuario, motivo);
        this.historialEstados.push(cambio);

        this.estado = nuevoEstado;
        
        const factoryNotification = new FactoryNotification();
        const notificacion = factoryNotification.crearSegunEstadoTurno(this);

        // TODO Qué hacer con la notificación? Como se la pueda enviar al medico y/o al paciente?
    }

    recordarTurno() {
        const factoryNotification = new FactoryNotification();
        const notificacion = factoryNotification.crearSegunEstadoTurno(this);

        // TODO Qué hacer con la notificación? Como se la pueda enviar al medico Y al paciente?
    }
}
