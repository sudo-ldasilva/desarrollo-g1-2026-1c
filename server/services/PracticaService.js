import { PracticaRepository } from "../repositories/PracticaRepository.js";

export class PracticaService {
    constructor({ practicaRepository = new PracticaRepository() } = {}) {
        this.practicaRepository = practicaRepository;
    }

    async obtenerTodos() {
        const practicas = await this.practicaRepository.obtenerTodos();
        return practicas;
    }

    async obtenerPaginados({ numeroPagina, limitePorPagina, filtros = {} } = {}) {
        const { practicas, totalPracticas } = await this.practicaRepository.obtenerPaginados(
            numeroPagina,
            limitePorPagina,
            filtros
        );

        const totalPaginas = totalPracticas === 0 ? 0 : Math.ceil(totalPracticas / limitePorPagina);

        return {
            practicas,
            numeroPagina,
            limitePorPagina,
            totalPaginas,
            totalPracticas
        };
    }

    async obtenerPorId(id) {
        const practica = await this.practicaRepository.obtenerPorId(id);
        return practica;
    }

    async crear(datos) {
        const practica = await this.practicaRepository.crear(datos);
        return practica;
    }

    async actualizar(id, datos) {
        const practica = await this.practicaRepository.actualizar(id, datos);
        return practica;
    }

    async eliminar(id) {
        const practica = await this.practicaRepository.eliminar(id);
        return practica;
    }
}
