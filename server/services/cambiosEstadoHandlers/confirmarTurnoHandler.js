import TurnosRepository from "../../repositories/turnosRepository.js";
import NotificacionesRepository from "../../repositories/notificacionesRepository.js";
import { EstadoTurno } from "../../domain/EstadoTurno.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../../errors/AppError.js";

export default class ConfirmarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.notificacionesRepository = new NotificacionesRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId, motivo } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new NotFoundError("Turno no encontrado"); 
        }

        if (turno.paciente?.usuario?._id != usuarioId &&
             turno.medico?.usuario?._id != usuarioId) {
            throw new ForbiddenError("El turno no corresponde al usuario"); 
        }

       if (turno.estado != EstadoTurno.RESERVADO && turno.estado !=
            EstadoTurno.PENDIENTE_REPROGRAMACION) {
            throw new BadRequestError("No puede confirmarse un turno si no esta reservado o pendiente de reprogramacion");
        }

        const mensajeMotivo = motivo || "Turno confirmado y agendado oficialmente";

        const notificacion = turno.actualizarEstado(EstadoTurno.CONFIRMADO, usuarioId, mensajeMotivo);

        await this.turnosRepository.actualizar(turno);
        await this.notificacionesRepository.crear(notificacion);

        return { turno, notificacion };
    }
}