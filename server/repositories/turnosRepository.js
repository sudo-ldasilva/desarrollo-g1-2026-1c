import {TurnoModel} from "../models/turnoSchema.js";


export default class TurnosRepository {
    constructor() {
        this.model = TurnoModel;
    } 

    async buscarPaginado(page, limit) {
        //cuantos documentos hay que saltar
        const skip = (page - 1) * limit;

        const turnos =
            await this.model
                .find()
                .populate("medico", "nombre")
                .populate("sede", "nombre direccion")
                .populate("especialidad", "nombre duracionTurnoEnMins costoConsulta")
                .populate("practica", "nombre duracionTurnoEnMins costoConsulta")
                .skip(skip)
                .limit(limit);

        const total =
            await this.model.countDocuments();

        return {
            turnos,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }
}