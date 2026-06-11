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
            const paciente = await PacienteModel.findById(pacienteId).populate("plan");
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
        dto.costo = costoBase;
        dto.cobertura = NivelCobertura.NO_CUBIERTA;

        if (plan && turno.servicio) {
            let nivel = null;

            if (turno.tipoServicio === "Especialidad") {

                const cobertura = plan.coberturasEspecialidad?.find(
                    c => String(c.especialidad) === String(turno.servicio._id)
                );
                nivel = cobertura?.nivel;
            } else if (turno.tipoServicio === "Practica") {

                const cobertura = plan.coberturasPractica?.find(
                    c => String(c.practica) === String(turno.servicio._id)
                );
                nivel = cobertura?.nivel;
            }

            if (nivel) {
                dto.cobertura = nivel;

                if (nivel === NivelCobertura.TOTAL) {
                    dto.costo = 0;
                } else if (nivel === NivelCobertura.PARCIAL) {
                    dto.costo = costoBase * 0.5; // 50% de descuento
                }
            }
        }

        return dto;
    }

    async turnosPorUsuario(filtros, usuarioId, pagina, limit) {
        let paciente = await this.pacientesRepository.buscarPorUsuarioId(usuarioId);
  
        if(filtros.fechaInicio && filtros.fechaFin && filtros.fechaFin < filtros.fechaInicio) {
            throw new BadRequestError("Rango invalido de fechas");
        }

        if (!paciente) {
            throw new BadRequestError("paciente no encontrado");
        }

        const { turnos, total, page, totalPages} =
        await this.turnosRepository.buscarPorPaciente(paciente._id, pagina, limit);

        return {
            turnos: turnos.map(t => turnoToDTO(t)),
            total,
            page,
            totalPages,
        };
    }

    async turnosPorPaciente(pacienteId, pagina, limit) {
        const paciente = await this.pacientesRepository.findById(pacienteId);

        if(!paciente) {
            throw new NotFoundError("No se encuentra usuario paciente");
        }

        const { turnos, total, page, totalPages} =
        await this.turnosRepository.buscarPorPaciente(paciente._id, pagina, limit);

        return {
            turnos: turnos.map(t => turnoToDTO(t)),
            total,
            page,
            totalPages,
        };
    }

}

export function turnoToDTO(turno) {
    const costoBase = turno.servicio?.costoConsulta || turno.servicio?.costo || 0;

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
        costoBase: costoBase,
        costo: turno.costo,
        cobertura: turno.cobertura
    };
}
