import notifacionesService from "../services/notificacionesService.js";

export default class NotificacionesController{
    constructor(){
        this.notifacionesService = new notifacionesService();
    }

    desplegarNotificaciones = async (req, res, next) => {
        try{
            const {page, limit} = req.validated.query;
            const paginacion = {page, limit};
            
            const busqueda = await this.notifacionesService.desplegarNotificaciones(paginacion);
            res.json(busqueda);
        } catch(error){
            next(error);
        }
    };
}