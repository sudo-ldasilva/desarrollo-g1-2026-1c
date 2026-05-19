import { PacienteModel } from "../models/pacienteSchema.js";

export default class PacientesRepository {
    constructor() {
        this.model = PacienteModel;
    }

    async buscarPorUsuarioId(usuarioId) {
        return await this.model.findOne({usuarioId});
    }
}