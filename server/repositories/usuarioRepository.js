import { UsuarioModel } from "../models/UsuarioModel.js";

export default class UsuarioRepository {
    constructor() {
        this.model = UsuarioModel;
    }

    async buscarPorId(usuarioId) {
        return await this.model.findById(usuarioId);
    }
}
