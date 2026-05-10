import { MedicosRepository } from "../repositories/medicosRepository.js";

export class MedicosService {
    constructor({ medicosRepository = new MedicosRepository() } = {}) {
        this.medicosRepository = medicosRepository;
    }

    obtenerTodos({ numeroPagina, limitePorPagina, filtros = {} } = {}) {
        const { medicos, totalMedicos } = this.medicosRepository.obtenerPaginados(
            numeroPagina,
            limitePorPagina,
            filtros
        );

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
