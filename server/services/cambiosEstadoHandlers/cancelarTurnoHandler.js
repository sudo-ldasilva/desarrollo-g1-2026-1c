import TurnosRepository from "../../repositories/turnosRepository.js";
import NotificacionesRepository from "../../repositories/notificacionesRepository.js";
import { EstadoTurno } from "../../domain/EstadoTurno.js";
import {NotFoundError, BadRequestError, ForbiddenError} from "../../errors/AppError.js";

export default class CancelarTurnoHandler {
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

        if (
            turno.paciente.usuario._id != usuarioId &&
            turno.medico.usuario._id != usuarioId
        ) {
            throw new ForbiddenError("El turno no corresponde al usuario"); 
        }

        const horaActual = new Date();
        const horaTurno = new Date(turno.fechaHora);
        const diferenciaHoras = (horaTurno - horaActual) / (1000 * 60 * 60);
        if (diferenciaHoras < 1) {
            throw new BadRequestError("El turno no puede cancelarse con anticipacion menor a 1 hora");
        }

        const notificacion = turno.actualizarEstado(EstadoTurno.CANCELADO, usuarioId, motivo);

        await this.turnosRepository.actualizar(turno);
        await this.notificacionesRepository.crear(notificacion);
        
        return { turno, notificacion };
    }
}