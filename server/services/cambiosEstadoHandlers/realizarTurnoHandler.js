import TurnosRepository from "../../repositories/turnosRepository.js";
import AppError from "../../errors/AppError.js";

export default class RealizarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId, motivo } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new AppError("Turno no encontrado", 404);
        }

        if (turno.estado !== "RESERVADO" && turno.estado !== "CONFIRMADO") {
            throw new AppError(`No puede marcarse como realizado un turno con estado ${turno.estado}`, 400);
        }

        const mensajeMotivo = motivo || "Turno realizado exitosamente";
        
        const notificacion = turno.actualizarEstado("REALIZADO", usuarioId, mensajeMotivo);

        await this.turnosRepository.actualizar(turno);

        return { turno, notificacion };
    }
}