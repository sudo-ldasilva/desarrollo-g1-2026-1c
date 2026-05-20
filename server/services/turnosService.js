import { BadRequestError, NotFoundError } from "../errors/AppError.js";
import PacientesRepository from "../repositories/pacientesRepository.js";
import TurnosRepository from "../repositories/turnosRepository.js";
import { PacienteModel } from "../models/PacienteModel.js";
import { NivelCobertura } from "../domain/NivelCobertura.js";

export default class TurnosService{
    constructor() {
        this.turnosRepository = new TurnosRepository();
        this.pacientesRepository = new PacientesRepository();
    }

    async buscarPaginado(filtros, paginacion, ordenamiento, pacienteId) {
        if(filtros.fechaInicio && filtros.fechaFin && filtros.fechaFin < filtros.fechaInicio) {
            throw new BadRequestError("Rango invalido de fechas");
        }

    let plan = null;
    if (pacienteId) {
        const paciente = await PacienteModel.findOne({ usuario: pacienteId }).populate("plan");
        if (paciente) plan = paciente.plan;
    }
        
        const { turnos, total, page, totalPages, sort } =
        await this.turnosRepository.buscarPaginado(filtros, paginacion, ordenamiento);

        return {
            turnos: turnos.map(t => this.calcularCostoTurno(t, plan)),
            total,
            page,
            totalPages,
            sort
        };
    }

    calcularCostoTurno(turno, plan) {
        const dto = turnoToDTO(turno);
        const costoBase = turno.servicio?.costoConsulta || turno.servicio?.costo || 0;
        dto.costoEstimado = costoBase; // Por defecto: NO CUBIERTA

        if (plan && turno.servicio) {
            try {
                const nivel = plan.obtenerCobertura(turno.servicio);
                if (nivel === NivelCobertura.TOTAL) dto.costoEstimado = 0;
                else if (nivel === NivelCobertura.PARCIAL) dto.costoEstimado = costoBase * 0.5; // 50% copago
            } catch (e) { /* Si no está cubierta o falla, se mantiene el costoBase */ }
    }
    return dto;
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
