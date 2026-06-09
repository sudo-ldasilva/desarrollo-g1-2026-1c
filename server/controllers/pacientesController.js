import PacientesRepository from "../repositories/pacientesRepository.js";

export class PacientesController {
    constructor () {
        this.pacientesRepository = new PacientesRepository();
    }

    crear = async (req, res, next) => {
        try {
            const {nombre, dni} = req.validated.body;

            const paciente = await this.pacientesRepository.crear(
                {
                    usuario: req.user._id,
                    nombre,
                    dni
                }
            );

            console.log("PACIENTE CREADO");
            return res.status(201).json(paciente);
        } catch(error){
            next(error);
        }
    };
}