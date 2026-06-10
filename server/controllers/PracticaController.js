import { PracticaService } from "../services/PracticaService.js";

export class PracticaController {
    constructor(practicaService = new PracticaService()) {
        this.practicaService = practicaService;
    }

    async findAll(req, res, next) {
        try {
            const { page = 1, limit = 10, codigo, nombre } = req.query;
            
            const filtros = {};
            if (codigo !== undefined) {
                filtros.codigo = codigo;
            }
            if (nombre !== undefined) {
                filtros.nombre = nombre;
            }

            const resultado = await this.practicaService.obtenerPaginados({
                numeroPagina: page,
                limitePorPagina: limit,
                filtros
            });

            res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async createPractica(req, res, next) {
        try {
            const practica = await this.practicaService.crear(req.body);
            return res.status(201).json(practica);
        } catch (error) {
            next(error);
        }
    }

    async updatePractica(req, res, next) {
        try {
            const { id } = req.params;
            const actualizada = await this.practicaService.actualizar(id, req.body);
            res.status(200).json(actualizada);
        } catch (error) {
            next(error);
        }
    }

    async deletePractica(req, res, next) {
        try {
            const { id } = req.params;
            await this.practicaService.eliminar(id);
            res.status(200).json({ status: "success", message: "Práctica eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
}
