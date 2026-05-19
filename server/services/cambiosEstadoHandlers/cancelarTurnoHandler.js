import TurnosRepository from "../../repositories/turnosRepository.js";
import AppError from "../../errors/AppError.js";

export default class CancelarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
    }

    async ejecutar(dto, usuario) {
        const { turnoId, motivo } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new AppError("Turno no encontrado", 404); 
        }

        const horaActual = new Date();
        const horaTurno = new Date(turno.fechaHora);
        const diferenciaHoras = (horaTurno - horaActual) / (1000 * 60 * 60);
        if (diferenciaHoras < 1) {
            throw new AppError("El turno no puede cancelarse con anticipacion menor a 1 hora", 400);
        }

        const notificacion = turno.actualizarEstado("CANCELADO", usuario, motivo);

        await this.turnosRepository.actualizar(turno);

        return { turno, notificacion };
    }
}