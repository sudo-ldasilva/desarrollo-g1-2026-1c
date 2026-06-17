import { SedeModel } from "../models/SedeModel.js";

export default class SedesController {
    async getAll(req, res, next) {
        try {
            const sedes = await SedeModel.find({}, "nombre direccion");
            res.json(sedes);
        } catch (error) {
            next(error);
        }
    }
}
