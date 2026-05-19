import TurnosRepository from "../../repositories/turnosRepository.js";
import PacientesRepository from "../../repositories/pacientesRepository.js";
import AppError from "../../errors/AppError.js";

export default class ReservarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.pacientesRepository = new PacientesRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new AppError("Turno no encontrado", 404);
        }

        if (turno.estado !== "DISPONIBLE") {
            throw new AppError("Turno no disponible", 400);
        }

        const paciente = await this.pacientesRepository.buscarPorUsuarioId(usuarioId);

        turno.asignarPaciente(paciente);

        const notificacion = turno.actualizarEstado("RESERVADO", usuarioId, "Paciente reservo turno");

        await this.turnosRepository.actualizar(turno);

        return { turno, notificacion };
    }
}