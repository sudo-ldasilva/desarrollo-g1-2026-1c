import TurnosRepository from "../../repositories/turnosRepository.js";
import NotificacionesRepository from "../../repositories/notificacionesRepository.js";
import { EstadoTurno } from "../../domain/EstadoTurno.js";
import {NotFoundError, BadRequestError} from "../../errors/AppError.js";

export default class RealizarTurnoHandler {
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

        if (turno.estado !== EstadoTurno.RESERVADO && turno.estado !== EstadoTurno.CONFIRMADO) {
            throw new BadRequestError(`No puede marcarse como realizado un turno con estado ${turno.estado}`);
        }

        if (turno.medico.usuario._id != usuarioId) {
            throw new BadRequestError("El turno no corresponde al medico");
        }

        const mensajeMotivo = motivo || "Turno realizado exitosamente";
        
        const notificacion = turno.actualizarEstado(EstadoTurno.REALIZADO, usuarioId, mensajeMotivo);

        await this.turnosRepository.actualizar(turno);
        await this.notificacionesRepository.crear(notificacion);
        
        return { turno, notificacion };
    }
}