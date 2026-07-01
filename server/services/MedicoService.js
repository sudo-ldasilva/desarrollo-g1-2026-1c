import { MedicoRepository } from "../repositories/MedicoRepository.js";
import { BadRequestError } from "../errors/AppError.js";

export class MedicoService {
    constructor({ medicoRepository = new MedicoRepository() } = {}) {
        this.medicoRepository = medicoRepository;
    }

    async obtenerTodos({ numeroPagina, limitePorPagina, filtros = {} } = {}) {
        const { medicos, totalMedicos } = await this.medicoRepository.obtenerPaginados(numeroPagina, limitePorPagina, filtros);

        const totalPaginas = totalMedicos === 0 ? 0 : Math.ceil(totalMedicos / limitePorPagina);

        return {
            medicos,
            numeroPagina,
            limitePorPagina,
            totalPaginas,
            totalMedicos
        };
    }

    async agregarDisponibilidad(idMedico, nuevaDisponibilidad) {
        const medico = await this.medicoRepository.findById(idMedico);
        if (!medico) throw new BadRequestError("Médico no encontrado");

        const obtenerId = (item) => item._id ? item._id.toString() : item.toString();

        if (!medico.sedes.some(s => obtenerId(s) === nuevaDisponibilidad.sede)) {
            throw new BadRequestError("La sede no está asociada al médico");
        }

        const esEspecialidad = nuevaDisponibilidad.especialidad && medico.especialidades.some(e => obtenerId(e) === nuevaDisponibilidad.especialidad);
        const esPractica = nuevaDisponibilidad.practica && medico.practicas.some(p => obtenerId(p) === nuevaDisponibilidad.practica);

        if (!esEspecialidad && !esPractica) {
            throw new BadRequestError("El servicio no está asociado a tu perfil");
        }

        const medicoActualizado = await this.medicoRepository.model.findByIdAndUpdate(
            idMedico,
            { $push: { disponibilidades: nuevaDisponibilidad } },
            { new: true }
        );

        return medicoActualizado;
    }

    async eliminarDisponibilidad(idMedico, idDisponibilidad) {
        const medicoActualizado = await this.medicoRepository.model.findByIdAndUpdate(
            idMedico,
            { $pull: { disponibilidades: { _id: idDisponibilidad } } },
            { new: true }
        );

        if (!medicoActualizado) throw new BadRequestError("Médico no encontrado");
        return medicoActualizado;
    }
}
