import TurnosRepository from "../../repositories/turnosRepository.js";
import NotificacionesRepository from "../../repositories/notificacionesRepository.js";
import {NotFoundError} from "../../errors/AppError.js";

export default class ReprogramarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.notificacionesRepository = new NotificacionesRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId, fechaHora, motivo } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new NotFoundError("Turno no encontrado");
        }

        const mensajeMotivo = motivo || `Solicitud de reprogramación para: ${fechaHora}`;
        
        const notificacion = turno.actualizarEstado("PENDIENTE_REPROGRAMACION", usuarioId, mensajeMotivo);

        turno.fechaHora = new Date(fechaHora);

        await this.turnosRepository.actualizar(turno);
        await this.notificacionesRepository.crear(notificacion);
        
        return { turno, notificacion };
    }
}