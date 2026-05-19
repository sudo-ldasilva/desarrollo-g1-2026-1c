import TurnosRepository from "../../repositories/turnosRepository.js";
import NotificacionesRepository from "../../repositories/notificacionesRepository.js";
import { EstadoTurno } from "../../domain/EstadoTurno.js";
import {NotFoundError, BadRequestError} from "../../errors/AppError.js";

export default class ReprogramarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.notificacionesRepository = new NotificacionesRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId, motivo, fechaHora } = dto;
        const nuevaFechaHora = new Date(fechaHora);

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new NotFoundError("Turno no encontrado");
        }

        if (turno.estado != EstadoTurno.RESERVADO) {
            throw new BadRequestError("El turno no puede reprogramarse si no esta reservado"); 
        }

        if (
            turno.paciente.usuario._id != usuarioId &&
            turno.medico.usuario._id != usuarioId
        ) {
            throw new BadRequestError("El turno no corresponde al usuario"); 
        }
 
        //la fecha debe ser posterior a hoy y distinta a la actual del turno
        if (nuevaFechaHora <= new Date()) {
            throw new BadRequestError("Debe ser una fecha futura");
        }

        if (nuevaFechaHora.getTime() === turno.fechaHora.getTime()) {
            throw new BadRequestError("Debe cambiar la fecha del turno");
        }

        const mensajeMotivo = motivo || `Solicitud de reprogramación para: ${fechaHora}`;
        
        const notificacion = turno.actualizarEstado(EstadoTurno.PENDIENTE_REPROGRAMACION, usuarioId, mensajeMotivo);

        turno.fechaHora = nuevaFechaHora;

        await this.turnosRepository.actualizar(turno);
        await this.notificacionesRepository.crear(notificacion);
        
        return { turno, notificacion };
    }
} //TODO falta la confirmacion del otro usuario