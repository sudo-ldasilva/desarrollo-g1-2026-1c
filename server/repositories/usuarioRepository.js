import { UsuarioModel } from "../models/UsuarioModel.js";

export default class PacientesRepository {
    constructor() {
        this.model = UsuarioModel;
    }

    async buscarPorId(usuarioId) {
        return await this.model.findById(usuarioId);
    }
}
