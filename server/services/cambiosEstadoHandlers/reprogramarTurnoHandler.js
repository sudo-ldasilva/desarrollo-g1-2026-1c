import TurnosRepository from "../../repositories/turnosRepository.js";
import {NotFoundError} from "../../errors/AppError.js";

export default class ReprogramarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
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

        return { turno, notificacion };
    }
}