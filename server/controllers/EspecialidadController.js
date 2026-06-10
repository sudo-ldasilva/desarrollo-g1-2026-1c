import { EspecialidadModel } from "../models/EspecialidadModel.js";
import { NotFoundError } from "../errors/AppError.js";

export class EspecialidadController {
    async findAll(req, res, next) {
        try {
            const especialidades = await EspecialidadModel.find();
            res.status(200).json(especialidades);
        } catch (error) {
            next(error);
        }
    }

    async createEspecialidad(req, res, next) {
        try {
            const { nombre, duracionTurnoEnMins, costoConsulta } = req.body;
            const nuevaEspecialidad = await EspecialidadModel.create({ nombre, duracionTurnoEnMins, costoConsulta });
            return res.status(201).json(nuevaEspecialidad);
        } catch (error) {
            next(error);
        }
    }

    async updateEspecialidad(req, res, next) {
        try {
            const { id } = req.params;
            const actualizada = await EspecialidadModel.findByIdAndUpdate(
                id, 
                req.body, 
                { new: true, runValidators: true }
            );
            
            if (!actualizada) {
                throw new NotFoundError(`Especialidad no encontrada: ${id}`);
            }
            res.status(200).json(actualizada);
        } catch (error) {
            next(error);
        }
    }

    async deleteEspecialidad(req, res, next) {
        try {
            const { id } = req.params;
            const eliminada = await EspecialidadModel.findByIdAndDelete(id);
            
            if (!eliminada) {
                throw new NotFoundError(`Especialidad no encontrada: ${id}`);
            }
            res.status(200).json({ status: "success", message: "Especialidad eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
}