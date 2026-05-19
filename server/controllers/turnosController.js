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
            const datosBody = req.validated.body;
        
            const { idTurno } = req.params;

            const dto = { turnoId: idTurno, ...datosBody };

            const usuario = datosBody.usuarioId;
        
            const rta = await this.cambiosEstadoTurnoService.ejecutar(dto, usuario);
        
            res.json(rta);
        } catch(error) {
            next(error);
        }
    };

    buscarPaginado = async (req, res, next) => {
        try{
            const { page, limit, sort, ...filtros } = req.validated.query;
            const paginacion = {page, limit};
            //TODO obtener usuario
            
            const busqueda = await this.turnosService.buscarPaginado(filtros, paginacion, sort);
            res.json(busqueda);
        } catch(error){
            next(error);
        }
    };

}