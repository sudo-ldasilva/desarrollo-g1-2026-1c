import { EspecialidadService } from "../services/EspecialidadService.js";

export class EspecialidadController {
    constructor(especialidadService = new EspecialidadService()) {
        this.especialidadService = especialidadService;
    }

    async findAll(req, res, next) {
        try {
            const { page = 1, limit = 10, nombre } = req.query;
            
            const filtros = {};
            if (nombre !== undefined) {
                filtros.nombre = nombre;
            }

            const resultado = await this.especialidadService.obtenerPaginados({
                numeroPagina: page,
                limitePorPagina: limit,
                filtros
            });

            res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async createEspecialidad(req, res, next) {
        try {
            const especialidad = await this.especialidadService.crear(req.body);
            return res.status(201).json(especialidad);
        } catch (error) {
            next(error);
        }
    }

    async updateEspecialidad(req, res, next) {
        try {
            const { id } = req.params;
            const actualizada = await this.especialidadService.actualizar(id, req.body);
            res.status(200).json(actualizada);
        } catch (error) {
            next(error);
        }
    }

    async deleteEspecialidad(req, res, next) {
        try {
            const { id } = req.params;
            await this.especialidadService.eliminar(id);
            res.status(200).json({ status: "success", message: "Especialidad eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
}