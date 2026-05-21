import { PacienteModel } from "../models/PacienteModel.js";

export default class PacientesRepository {
    constructor() {
        this.model = PacienteModel;
    }

    async buscarPorUsuarioId(usuarioId) {
        return await this.model.findOne({ usuario: usuarioId }).populate("plan");
    }

    async findById(pacienteId) {
        return await this.model.findById(pacienteId);
    }
}
