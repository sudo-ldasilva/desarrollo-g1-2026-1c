import PacientesRepository from "../repositories/pacientesRepository.js";
import pacientesService from "../services/pacientesService.js"; 

export class PacientesController {
    constructor () {
        this.pacientesService = new pacientesService();
        this.pacientesRepository = new PacientesRepository();
    }

    crear = async (req, res, next) => {
        try {
            const {nombre, dni, obraSocial, plan} = req.validated.body;

            const paciente = await this.pacientesRepository.crear(
                {
                    usuario: req.user._id,
                    nombre,
                    dni,
                    obraSocial,
                    plan 
                }
            );

            console.log("PACIENTE CREADO");
            return res.status(201).json(paciente);
        } catch(error){
            next(error);
        }
    };


    obtenerPorId = async (req,res,next) =>{
        try {
            const { id } = req.params;

            const paciente = await this.pacientesService.obtenerPacientePorId(id);

            if (!paciente) {
                return res.status(404).json({
                    status: "fail",
                    message: `No se encontró ningún paciente con el ID: ${id}`
                });
            }

            res.status(200).json({
                status: "success",
                data: paciente
            });
        } catch (error) {
            next(error);
        }

    };


}