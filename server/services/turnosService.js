import { BadRequestError } from "../errors/AppError.js";
import TurnosRepository from "../repositories/turnosRepository.js";

export default class TurnosService{
    constructor() {
        this.turnosRepository = new TurnosRepository();
    }

    async buscarPaginado(filtros, paginacion, ordenamiento) {
        if(filtros.fechaInicio && filtros.fechaFin && filtros.fechaFin < filtros.fechaInicio) {
            throw new BadRequestError("Rango invalido de fechas");
        }
        
        const { turnos, total, page, totalPages, sort } =
        await this.turnosRepository.buscarPaginado(filtros, paginacion, ordenamiento);

        return {
            turnos: turnos.map(t => turnoToDTO(t)),
            total,
            page,
            totalPages,
            sort
        };
    }
}

export function turnoToDTO(turno) {
    return {
        id: turno._id,
        fechaHora: turno.fechaHora,
        medico: {
            id: turno.medico._id,
            nombre: turno.medico.nombre
        },
        servicio: turno.servicio,
        tipoServicio: turno.tipoServicio,
        sede: {
            id: turno.sede._id,
            nombre: turno.sede.nombre,
            direccion: turno.sede.direccion
        },
        estado: turno.estado,
        costo: turno.costo //Sería el costo calculado (cambia segun paciente que consulta)
        //TODO: calcular costo segun el usuario paciente y ordenar los turnos segun el mismo.
        //Por ahora, el ord por costo se hace usando los registros hardcodeados de la seed.
    };
}