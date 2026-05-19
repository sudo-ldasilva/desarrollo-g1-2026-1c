import TurnosRepository from "../../repositories/turnosRepository.js";
import NotificacionesRepository from "../../repositories/notificacionesRepository.js";
import {NotFoundError, BadRequestError} from "../../errors/AppError.js";

export default class CancelarTurnoHandler {
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.notificacionesRepository = new NotificacionesRepository();
    }

    async ejecutar(dto, usuario) {
        const { turnoId, motivo } = dto;

        const turno = await this.turnosRepository.buscarPorId(turnoId);
        if (!turno) {
            throw new NotFoundError("Turno no encontrado"); 
        }

        const horaActual = new Date();
        const horaTurno = new Date(turno.fechaHora);
        const diferenciaHoras = (horaTurno - horaActual) / (1000 * 60 * 60);
        if (diferenciaHoras < 1) {
            throw new BadRequestError("El turno no puede cancelarse con anticipacion menor a 1 hora");
        }

        const notificacion = turno.actualizarEstado("CANCELADO", usuario, motivo);

        await this.turnosRepository.actualizar(turno);
        await this.notificacionesRepository.crear(notificacion);
        
        return { turno, notificacion };
    }
}