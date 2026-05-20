import { BadRequestError, NotFoundError } from "../errors/AppError.js";
import PacientesRepository from "../repositories/pacientesRepository.js";
import TurnosRepository from "../repositories/turnosRepository.js";

export default class TurnosService{
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.pacientesRepository = new PacientesRepository();
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

    async listarHistorialPaciente(usuarioId, page, limit) {
        const paciente = await this.pacientesRepository.buscarPorUsuarioId(usuarioId);

        if(!paciente) {
            throw new NotFoundError("No se encuentra usuario paciente");
        }

        return await this.turnosRepository.buscarPorPaciente(paciente._id, page, limit);
    }
}

export function turnoToDTO(turno) {
    return {
        _id: turno._id,
        fechaHora: turno.fechaHora,
        medico: {
            _id: turno.medico._id,
            nombre: turno.medico.nombre
        },
        servicio: turno.servicio,
        tipoServicio: turno.tipoServicio,
        sede: {
            _id: turno.sede._id,
            nombre: turno.sede.nombre,
            direccion: turno.sede.direccion
        },
        estado: turno.estado,
        costo: turno.costo //Sería el costo calculado (cambia segun paciente que consulta)
        //TODO: calcular costo segun el usuario paciente y ordenar los turnos segun el mismo.
        //Por ahora, el ord por costo se hace usando los registros hardcodeados de la seed.
    };   
}