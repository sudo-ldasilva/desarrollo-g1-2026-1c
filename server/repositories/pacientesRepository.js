import { PacienteModel } from "../models/PacienteModel.js";
import { ConflictError } from "../errors/AppError.js";

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

  async crear(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      // Interceptar el error de clave duplicada de MongoDB
      if (error.code === 11000) {
        const campoDuplicado = Object.keys(error.keyValue)[0];
        if (campoDuplicado === "dni") {
          throw new ConflictError(`El DNI ${error.keyValue.dni} ya se encuentra registrado en el sistema.`);
        }
      }
      // Si es otro error, se propaga para que lo maneje el errorHandler global
      throw error;
    }
  }
}
