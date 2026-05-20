import { EstadoTurno } from "./EstadoTurno.js";
import { Notificacion } from "./Notificacion.js";

class FactoryNotificacion {
    crearSegunEstadoTurno(turno) {
        // TODO Está bien?
        switch (turno.estado) {
        case EstadoTurno.DISPONIBLE:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: "El turno está disponible "
            });

        case EstadoTurno.RESERVADO:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: "El paciente " + turno.paciente.nombre + " solicito el servicio " + turno.servicio.nombre,
            });

        case EstadoTurno.CONFIRMADO:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: "El paciente " + turno.paciente.nombre + " confirmo el servicio " + turno.servicio.nombre,
            });

        case EstadoTurno.CANCELADO:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: "El paciente " + turno.paciente.nombre + " cancelo el servicio " + turno.servicio.nombre,
            });

        case EstadoTurno.REALIZADO:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: "El servicio " + turno.servicio.nombre + " está realizado.",
            });
        
        case EstadoTurno.PENDIENTE_REPROGRAMACION:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: "El turno para servicio " + turno.servicio.nombre + " queda pendiente de reprogramacion.",
            });

        default:
            throw new Error(`Falta agregar el estado ${turno.estado} al switch de FactoryNotificacion en crearSegunEstadoTurno`);
        }
    }

    //Solamente se va  a realizar un recordatorio al paciente y al médico
    //recordar(turno){
    //  return new Notificacion( id,turno.medico, "Sweet Medical", "Recordá que mañana tenes un turno pendiente!")
    // Habría que mandar también un mensaje al paciente
    //}
}

export default FactoryNotificacion;
