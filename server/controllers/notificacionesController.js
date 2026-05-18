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
}