import { EstadoTurno } from "./EstadoTurno.js";
import { Notificacion } from "./Notificacion.js";

class FactoryNotificacion {
    crearSegunEstadoTurno(turno, quien) {
        
        switch (turno.estado) {

        case EstadoTurno.RESERVADO:
            return new Notificacion({
                destinatario: turno.medico.usuario,
                remitente: turno.paciente.usuario,
                mensaje: "El paciente " + turno.paciente.nombre + " solicito el servicio " + turno.servicio.nombre,
            });

        case EstadoTurno.CONFIRMADO:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: turno.paciente.nombre + ", el turno para  " + turno.servicio.nombre + 
                " a las " + turno.fechaHora + " fue confirmado",
            });

        case EstadoTurno.CANCELADO: {
            const canceloPaciente = quien == turno.paciente.usuario._id;

            return new Notificacion({

                destinatario: canceloPaciente
                    ? turno.medico.usuario
                    : turno.paciente.usuario,

                remitente: quien,

                mensaje: canceloPaciente
                    ? `El paciente ${turno.paciente.nombre} canceló el turno`
                    : `El médico ${turno.medico.nombre} canceló el turno`
            });
        }
        case EstadoTurno.REALIZADO:
            return new Notificacion({
                destinatario: turno.paciente.usuario,
                remitente: turno.medico.usuario,
                mensaje: "El turno para servicio " + turno.servicio.nombre + " está realizado.",
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
