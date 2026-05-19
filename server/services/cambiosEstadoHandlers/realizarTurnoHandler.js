import TurnosRepository from "../../repositories/turnosRepository.js";
import {NotFoundError, BadRequestError} from "../../errors/AppError.js";

export default class RealizarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId, motivo } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new NotFoundError("Turno no encontrado");
        }

        if (turno.estado !== "RESERVADO" && turno.estado !== "CONFIRMADO") {
            throw new BadRequestError(`No puede marcarse como realizado un turno con estado ${turno.estado}`);
        }

        const mensajeMotivo = motivo || "Turno realizado exitosamente";
        
        const notificacion = turno.actualizarEstado("REALIZADO", usuarioId, mensajeMotivo);

        await this.turnosRepository.actualizar(turno);

        return { turno, notificacion };
    }
}