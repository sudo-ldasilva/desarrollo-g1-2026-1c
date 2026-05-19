import TurnosRepository from "../../repositories/turnosRepository.js";
import PacientesRepository from "../../repositories/pacientesRepository.js";
import NotificacionesRepository from "../../repositories/notificacionesRepository.js";
import { EstadoTurno } from "../../domain/EstadoTurno.js";
import {NotFoundError, BadRequestError} from "../../errors/AppError.js";

export default class ReservarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.pacientesRepository = new PacientesRepository();
        this.notificacionesRepository = new NotificacionesRepository();
    }

    async ejecutar(dto, usuarioId) {
        const { turnoId } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new NotFoundError("Turno no encontrado");
        }

        if (turno.estado !== EstadoTurno.DISPONIBLE) {
            throw new BadRequestError("Turno no disponible");
        }

        const paciente = await this.pacientesRepository.buscarPorUsuarioId(usuarioId);

        if(!paciente) {
            throw new NotFoundError("Usuario paciente no encontrado");
        }

        turno.asignarPaciente(paciente);

        const notificacion = turno.actualizarEstado(EstadoTurno.RESERVADO, paciente.usuario, "Paciente reservo turno");

        await this.turnosRepository.actualizar(turno);
        await this.notificacionesRepository.crear(notificacion);
       
        return { turno, notificacion };
    }
}