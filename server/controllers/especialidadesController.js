import { EspecialidadModel } from "../models/EspecialidadModel.js";

export default class EspecialidadesController {
    async getAll(req, res, next) {
        try {
            const especialidades = await EspecialidadModel.find({}, "nombre");
            res.json(especialidades);
        } catch (error) {
            next(error);
        }
    }
}
