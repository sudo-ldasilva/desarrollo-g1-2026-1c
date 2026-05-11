import { MedicoRepository } from "../repositories/MedicoRepository.js";

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
}
