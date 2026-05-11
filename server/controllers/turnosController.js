import {CambiosEstadoTurnoService} from "../services/cambiosEstadoTurnoService.js";
import {TunosServices} from "../services/turnosService.js";
import {cambioEstadoTurnoSchema} from "../validations/cambioEstadoTurnoSchema.js";
import {BadRequestError} from "../errors/AppError.js";

export class TurnosController {
    constructor(){
        this.cambiosEstadoTurnoService = CambiosEstadoTurnoService;
        this.turnosService = TunosServices;
    }

    async buscarMisTurnos(req, res, next){
        //TODO
    }

    async cambiarEstado(req, res, next){
        try {
            const resultado = cambioEstadoTurnoSchema.safeParse(req.body);
        
            if (resultado.error) {
                throw new BadRequestError(resultado.error.issues);
            }

            const dto = resultado.data;
        
            //TODO obtener usuario
            const usuario = null;
        
            await this.cambiosEstadoTurnoService.ejecutar(dto, usuario);
        
            res.sendStatus(200);
        } catch(err) {
            next(err);
        }
    }

    async buscar(req, res, next){
        //TODO
    }

}