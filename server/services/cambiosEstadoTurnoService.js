import {EstadoTurno} from "../domain/EstadoTurno.js";
import ReservarTurnoHandler from "./cambiosEstadoHandlers/reservarTurnoHandler.js";
import CancelarTurnoHandler from "./cambiosEstadoHandlers/cancelarTurnoHandler.js";
import ReprogramarTurnoHandler from "./cambiosEstadoHandlers/reprogramarTurnoHandler.js";
import RealizarTurnoHandler from "./cambiosEstadoHandlers/realizarTurnoHandler.js";
import {BadRequestError} from "../errors/AppError.js";

export default class CambiosEstadoTurnoService {
    
    async ejecutar(dto, usuario) {
        const estrategia = this.elegirEstrategia(dto.estado);
        return estrategia.ejecutar(dto, usuario);
    }

    elegirEstrategia(estado) {
        switch (estado) {
        
        case EstadoTurno.RESERVADO:
            return new ReservarTurnoHandler();
        
        case EstadoTurno.CANCELADO:
            return new CancelarTurnoHandler();

        case EstadoTurno.PENDIENTE_REPROGRAMACION:
            return new ReprogramarTurnoHandler();

        case EstadoTurno.REALIZADO:
            return new RealizarTurnoHandler();
        
        default:
            throw new BadRequestError("Estado inválido");
        
        }
    }
}