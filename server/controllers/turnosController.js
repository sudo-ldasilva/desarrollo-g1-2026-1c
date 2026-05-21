import CambiosEstadoTurnoService from "../services/cambiosEstadoTurnoService.js";
import TurnosService from "../services/turnosService.js";

export default class TurnosController {
    constructor() {
        this.cambiosEstadoTurnoService = new CambiosEstadoTurnoService();
        this.turnosService = new TurnosService();
    }

    async buscarMisTurnos(req, res, next){
        try {
        // --- HOY: Lo sacamos de un header personalizado para Postman ---
        // --- MAÑANA CON JWT: Esto va a cambiar a: const usuarioId = req.user.id; ---
            const usuarioId = req.headers["x-usuario-id"]; 
        
            
            if (!usuarioId) {
                return res.status(401).json({
                    status: "fail",
                    message: "No se proporcionó una sesión válida"
                });
            }

            
            const { page, limit } = req.validated.query;

            const historial = await this.turnosService.turnosPorUsuario(usuarioId, page, limit);

            res.status(200).json({
                status: "success",
                ...historial
            });
        } catch (error) {
            next(error);
        }


    }

    cambiarEstado = async (req, res, next) => {
        try {
            const datosBody = req.validated.body;
        
            const { idTurno } = req.params;

            const dto = { turnoId: idTurno, ...datosBody };

            const usuarioId = datosBody.usuarioId;
        
            const rta = await this.cambiosEstadoTurnoService.ejecutar(dto, usuarioId);
        
            res.json(rta);
        } catch(error) {
            next(error);
        }
    };

    buscarPaginado = async (req, res, next) => {
        try{
            const { page, limit, sort, pacienteId, ...filtros } = req.validated.query;
            const paginacion = {page, limit};

            const busqueda = await this.turnosService.buscarPaginado(filtros, paginacion, sort, pacienteId);
            res.json(busqueda);
        } catch(error){
            next(error);
        }
    };

    buscarHistorialPaciente = async (req, res, next) => {
        try {
            const { pacienteId } = req.params;
            const { page, limit } = req.validated?.query || req.query;
            const paginacion = { page: Number(page) || 1, limit: Number(limit) || 10 };
    
            const historial = await this.turnosService.turnosPorPaciente(pacienteId, paginacion.page, paginacion.limit);
            res.json(historial);
        } catch (error) {
            next(error);
        }
    };
}
