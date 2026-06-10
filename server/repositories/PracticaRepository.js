import { PracticaModel } from "../models/PracticaModel.js";
import { NotFoundError, BadRequestError } from "../errors/AppError.js";

export class PracticaRepository {
    constructor() {
        this.model = PracticaModel;
    }

    async obtenerTodos(filtros = {}) {
        const practicas = await this.model.find(filtros);
        return practicas;
    }

    async obtenerPaginados(numeroPagina, limitePorPagina, filtros = {}) {
        const skip = (numeroPagina - 1) * limitePorPagina;

        const totalPracticas = await this.model.countDocuments(filtros);
        
        if (totalPracticas === 0) {
            return {
                practicas: [],
                totalPracticas,
                totalPaginas: 0
            };
        }

        if (totalPracticas <= skip) {
            throw new BadRequestError("La página solicitada excede la cantidad de páginas totales");
        }

        const practicas = await this.model
            .find(filtros)
            .skip(skip)
            .limit(limitePorPagina);

        return {
            practicas,
            totalPracticas
        };
    }

    async obtenerPorId(id) {
        const practica = await this.model.findById(id);
        
        if (!practica) {
            throw new NotFoundError(`Práctica no encontrada: ${id}`);
        }

        return practica;
    }

    async crear(datos) {
        const nuevaPractica = await this.model.create(datos);
        return nuevaPractica;
    }

    async actualizar(id, datos) {
        const practicaActualizada = await this.model.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!practicaActualizada) {
            throw new NotFoundError(`Práctica no encontrada: ${id}`);
        }

        return practicaActualizada;
    }

    async eliminar(id) {
        const practicaEliminada = await this.model.findByIdAndDelete(id);

        if (!practicaEliminada) {
            throw new NotFoundError(`Práctica no encontrada: ${id}`);
        }

        return practicaEliminada;
    }
}
