import NotificacionesRepository from "../repositories/notificacionesRepository.js";

export default class NotificacionesService{
    constructor(){
        this.NotificacionesRepository = new NotificacionesRepository();
    }

    async desplegarNotificaciones(paginacion) { 
        const { notificaciones, total, page, totalPages } =
            await this.NotificacionesRepository.desplegarNotificaciones(paginacion);
    
        return {
            notificaciones,
            total,
            page,
            totalPages
        };
    }

}