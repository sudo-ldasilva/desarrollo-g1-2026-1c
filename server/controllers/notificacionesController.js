import NotificacionesService from "../services/notificacionesService.js";

export default class NotificacionesController{
    constructor(){
        this.notificacionesService = new NotificacionesService();
    }

    desplegarNotificaciones = async (req, res, next) => {
        try{
            const usuarioId = req.headers["x-usuario-id"];

            if (!usuarioId) {
                return res.status(401).json({
                    status: "fail",
                    message: "No se proporcionó una sesión válida"
                });
            }

            const { page, limit } = req.validated.query;
            const estado = req.validated.query?.estado;

            const filtros = estado
                ? { leida: estado === "leidas" }
                : {};

            const paginacion = { page, limit };
            
            const busqueda = await this.notificacionesService.desplegarNotificaciones(usuarioId,paginacion, filtros);
            res.status(200).json({
                status: "success",
                ...busqueda
            });
        } catch(error){
            next(error);
        }
    };

    obtenerPorId = async (req,res,next) =>{
        try {
            const { id } = req.validated.params;

            const notificacion = await this.notificacionesService.obtenerNotificacionPorId(id);

            if (!notificacion) {
                return res.status(404).json({
                    status: "fail",
                    message: `No se encontró ninguna notificación con el ID: ${id}`
                });
            }

            res.status(200).json({
                status: "success",
                data: notificacion
            });
        } catch (error) {
            next(error);
        }

    };

    marcarComoLeida = async (req,res,next) =>{
        try {
            const { id } = req.validated.params; 

           
            const notificacionActualizada = await this.notificacionesService.modificarEstadoLectura(id);

            if (!notificacionActualizada) {
                return res.status(404).json({
                    status: "fail",
                    message: "No se encontró la notificación"
                });
            }

            res.status(200).json({
                status: "success",
                data: notificacionActualizada
            });
        } catch (error) {
            next(error);
        }
    };
}