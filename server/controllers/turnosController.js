import CambiosEstadoTurnoService from "../services/cambiosEstadoTurnoService.js";
import TurnosService from "../services/turnosService.js";

export default class TurnosController {
    constructor() {
        this.cambiosEstadoTurnoService = new CambiosEstadoTurnoService();
        this.turnosService = new TurnosService();
    }

    async buscarMisTurnos(req, res, next){
        //TODO
    }

    cambiarEstado = async (req, res, next) => {
        try {
            const dto = req.validated.query;
        
            //TODO obtener usuario
            const usuario = null;
        
            await this.cambiosEstadoTurnoService.ejecutar(dto, usuario);
        
            res.sendStatus(200);
        } catch(error) {
            next(error);
        }
    };

    buscarPaginado = async (req, res, next) => {
        try{
            const { page, limit, ...filtros } = req.validated.query;
            const paginacion = {page, limit};
            //TODO obtener usuario
            
            const busqueda = await this.turnosService.buscarPaginado(filtros, paginacion);
            res.json(busqueda);
        } catch(error){
            next(error);
        }
    };

}