import { EspecialidadModel } from "../models/EspecialidadModel.js";
import { NotFoundError, BadRequestError } from "../errors/AppError.js";

export class EspecialidadRepository {
    constructor() {
        this.model = EspecialidadModel;
    }

    async obtenerTodos(filtros = {}) {
        const especialidades = await this.model.find(filtros);
        return especialidades;
    }

    async obtenerPaginados(numeroPagina, limitePorPagina, filtros = {}) {
        const skip = (numeroPagina - 1) * limitePorPagina;

        const totalEspecialidades = await this.model.countDocuments(filtros);
        
        if (totalEspecialidades === 0) {
            return {
                especialidades: [],
                totalEspecialidades,
                totalPaginas: 0
            };
        }

        if (totalEspecialidades <= skip) {
            throw new BadRequestError("La página solicitada excede la cantidad de páginas totales");
        }

        const especialidades = await this.model
            .find(filtros)
            .skip(skip)
            .limit(limitePorPagina);

        return {
            especialidades,
            totalEspecialidades
        };
    }

    async obtenerPorId(id) {
        const especialidad = await this.model.findById(id);
        
        if (!especialidad) {
            throw new NotFoundError(`Especialidad no encontrada: ${id}`);
        }

        return especialidad;
    }

    async crear(datos) {
        const nuevaEspecialidad = await this.model.create(datos);
        return nuevaEspecialidad;
    }

    async actualizar(id, datos) {
        const especialidadActualizada = await this.model.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!especialidadActualizada) {
            throw new NotFoundError(`Especialidad no encontrada: ${id}`);
        }

        return especialidadActualizada;
    }

    async eliminar(id) {
        const especialidadEliminada = await this.model.findByIdAndDelete(id);

        if (!especialidadEliminada) {
            throw new NotFoundError(`Especialidad no encontrada: ${id}`);
        }

        return especialidadEliminada;
    }
}
