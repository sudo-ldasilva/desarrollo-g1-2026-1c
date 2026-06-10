import { PracticaModel } from "../models/PracticaModel.js";
import { NotFoundError } from "../errors/AppError.js";

export class PracticaController {
    async findAll(req, res, next) {
        try {
            const practicas = await PracticaModel.find();
            res.status(200).json(practicas);
        } catch (error) {
            next(error);
        }
    }

    async createPractica(req, res, next) {
        try {
            const { codigo, nombre, duracionTurnoEnMins, costo } = req.body;
            const nuevaPractica = await PracticaModel.create({ codigo, nombre, duracionTurnoEnMins, costo });
            return res.status(201).json(nuevaPractica);
        } catch (error) {
            next(error);
        }
    }

    async updatePractica(req, res, next) {
        try {
            const { id } = req.params;
            const actualizada = await PracticaModel.findByIdAndUpdate(
                id, 
                req.body, 
                { new: true, runValidators: true }
            );
            
            if (!actualizada) {
                throw new NotFoundError(`Práctica no encontrada: ${id}`);
            }
            res.status(200).json(actualizada);
        } catch (error) {
            next(error);
        }
    }

    async deletePractica(req, res, next) {
        try {
            const { id } = req.params;
            const eliminada = await PracticaModel.findByIdAndDelete(id);
            
            if (!eliminada) {
                throw new NotFoundError(`Práctica no encontrada: ${id}`);
            }
            res.status(200).json({ status: "success", message: "Práctica eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
}
