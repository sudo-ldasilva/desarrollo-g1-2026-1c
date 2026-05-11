import { MedicoRepository } from "../repositories/MedicoRepository.js";

const medicoRepository = new MedicoRepository();

export const getMedicoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medico = await medicoRepository.findById(id);
    
    res.status(200).json(medico);
  } catch (error) {
    next(error); // Pasa el error al errorHandler global (incluyendo 404)
  }
};
