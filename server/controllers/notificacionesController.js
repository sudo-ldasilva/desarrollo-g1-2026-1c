import NotificacionesService from "../services/notificacionesService.js";

export default class NotificacionesController{
    constructor(){
        this.notificacionesService = new NotificacionesService();
    }

    desplegarNotificaciones = async (req, res, next) => {
        try{
            const { page, limit } = req.validated.query;
            const estado = req.validated.params?.estado;

            const filtros = estado
                ? { leida: estado === "leidas" }
                : {};

            const paginacion = { page, limit };
            //TODO obtener usuario de la request y hacer la búsqueda según ese usuario.
            
            const busqueda = await this.notificacionesService.desplegarNotificaciones(paginacion, filtros);
            res.json(busqueda);
        } catch(error){
            next(error);
        }
    };

    obtenerPorId = async (req,res,next) =>{

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