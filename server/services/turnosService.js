import { BadRequestError } from "../errors/AppError.js";
import TurnosRepository from "../repositories/turnosRepository.js";

export default class TurnosService{
    constructor() {
        this.turnosRepository = new TurnosRepository();
    }

    toDTO(turno) {
        const servicio = turno.especialidad
            ? {
                tipo: "especialidad",
                id: turno.especialidad._id,
                nombre: turno.especialidad.nombre,
                duracion: turno.especialidad.duracionTurnoEnMins,
                costoConsulta: turno.especialidad.costoConsulta
            }
            : turno.practica
                ? {
                    tipo: "practica",
                    id: turno.practica._id,
                    nombre: turno.practica.nombre,
                    duracion: turno.practica.duracionTurnoEnMins,
                    costoConsulta: turno.practica.costoConsulta
                }
                : null;
        
        return {
            id: turno._id,
            fechaHora: turno.fechaHora,
            medico: turno.medico ? {
                id: turno.medico._id,
                nombre: turno.medico.nombre
            } : null,
            servicio, //puede ser especialidad/práctica
            sede: turno.sede ? {
                id: turno.sede._id,
                nombre: turno.sede.nombre,
                direccion: turno.sede.direccion
            } : null,
            estado: turno.estado,
            costo: turno.costo //Sería el costo calculado (cambia segun paciente que consulta) 
            //TODO: calcular costo segun el usuario paciente y ordenar los turnos segun el mismo.
            //Por ahora, el ord por costo se hace usando los registros hardcodeados de la seed.
        };
    }

    async buscarPaginado(filtros, paginacion, ordenamiento) {
        if(filtros.fechaInicio && filtros.fechaFin && filtros.fechaFin < filtros.fechaInicio) {
            throw new BadRequestError("Rango invalido de fechas");
        }
        
        const { turnos, total, page, totalPages, sort } =
        await this.turnosRepository.buscarPaginado(filtros, paginacion, ordenamiento);

        return {
            turnos: turnos.map(t => this.toDTO(t)),
            total,
            page,
            totalPages,
            sort
        };
    }
}