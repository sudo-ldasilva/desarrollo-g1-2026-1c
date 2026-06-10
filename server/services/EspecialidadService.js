import { EspecialidadRepository } from "../repositories/EspecialidadRepository.js";

export class EspecialidadService {
    constructor({ especialidadRepository = new EspecialidadRepository() } = {}) {
        this.especialidadRepository = especialidadRepository;
    }

    async obtenerTodos() {
        const especialidades = await this.especialidadRepository.obtenerTodos();
        return especialidades;
    }

    async obtenerPaginados({ numeroPagina, limitePorPagina, filtros = {} } = {}) {
        const { especialidades, totalEspecialidades } = await this.especialidadRepository.obtenerPaginados(
            numeroPagina,
            limitePorPagina,
            filtros
        );

        const totalPaginas = totalEspecialidades === 0 ? 0 : Math.ceil(totalEspecialidades / limitePorPagina);

        return {
            especialidades,
            numeroPagina,
            limitePorPagina,
            totalPaginas,
            totalEspecialidades
        };
    }

    async obtenerPorId(id) {
        const especialidad = await this.especialidadRepository.obtenerPorId(id);
        return especialidad;
    }

    async crear(datos) {
        const especialidad = await this.especialidadRepository.crear(datos);
        return especialidad;
    }

    async actualizar(id, datos) {
        const especialidad = await this.especialidadRepository.actualizar(id, datos);
        return especialidad;
    }

    async eliminar(id) {
        const especialidad = await this.especialidadRepository.eliminar(id);
        return especialidad;
    }
}
