import {EstadoTurno} from "./EstadoTurno.js";
import { Notificacion } from "./Notificacion.js";

class FactoryNotificacion {
    crearSegunEstadoTurno(turno) {
        // TODO Está bien?
        switch (turno.estado()) {
        case EstadoTurno.DISPONIBLE:
            return new Notificacion(
                turno.medico,
                turno.paciente,
                "El turno está disponible ",
            );

        case EstadoTurno.RESERVADO:
            return new Notificacion(
                turno.medico,
                turno.paciente,
                "El paciente " + paciente.nombre() + " solicito el servicio " + turno.practica(),
            );

        case EstadoTurno.CONFIRMADO:
            return new Notificacion(
                turno.medico,
                turno.paciente,
                "El paciente " + paciente.nombre() + " confirmo el servicio " + turno.practica(),
            );

        case EstadoTurno.CANCELADO:
            return new Notificacion(
                turno.medico,
                turno.paciente,
                "El paciente " + paciente.nombre() + " cancelo el servicio " + turno.practica(),
            );

        case EstadoTurno.REALIZADO:
            return new Notificacion(
                turno.medico,
                turno.paciente,
                "El servicio " + turno.practica() + " está realizado.",
            );
            
        default:
            console.error("Hay un estado de turno que no se tiene en cuenta para crear la notificación: " + turno.estado());
            break;
        }
    }

    //Solamente se va  a realizar un recordatorio al paciente y al médico
    //recordar(turno){
    //  return new Notificacion( id,turno.medico, "Sweet Medical", "Recordá que mañana tenes un turno pendiente!")
    // Habría que mandar también un mensaje al paciente
    //}
}
