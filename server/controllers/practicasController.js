import { PracticaModel } from "../models/PracticaModel.js";

export default class PracticasController {
    async getAll(req, res, next) {
        try {
            const practicas = await PracticaModel.find({}, "nombre duracionTurnoEnMins costo");
            res.json(practicas);
        } catch (error) {
            next(error);
        }
    }
}
