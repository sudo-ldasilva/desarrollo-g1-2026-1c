import TurnosRepository from "../../repositories/turnosRepository.js";
import PacientesRepository from "../../repositories/pacientesRepository.js";
import {NotFoundError, BadRequestError} from "../../errors/AppError.js";

export default class ReservarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.pacientesRepository = new PacientesRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new NotFoundError("Turno no encontrado");
        }

        if (turno.estado !== "DISPONIBLE") {
            throw new BadRequestError("Turno no disponible");
        }

        const paciente = await this.pacientesRepository.buscarPorUsuarioId(usuarioId);

        if(!paciente) {
            throw new NotFoundError("Usuario paciente no encontrado");
        }

        turno.asignarPaciente(paciente);

        const notificacion = turno.actualizarEstado("RESERVADO", paciente.usuario, "Paciente reservo turno");
        //TODO, hay que persistir la notificacion

        await this.turnosRepository.actualizar(turno);

        return { turno, notificacion };
    }
}