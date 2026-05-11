import MedicoModel from "../models/MedicoModel.js";
import { NotFoundError } from "../errors/AppError.js";

export class MedicoRepository {
  async findById(id) {
    const medicoDoc = await MedicoModel.findOne({ id });

    if (!medicoDoc) {
      throw new NotFoundError(`Médico con ID ${id} no encontrado`);
    }

    // Retorna el objeto plano para enviarlo como JSON
    return medicoDoc.toObject();
  }
}
