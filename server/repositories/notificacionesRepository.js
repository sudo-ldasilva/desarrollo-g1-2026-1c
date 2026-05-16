import { NotificacionModel } from "../models/notificacionSchema.js";

export default class NotificacionesRepository{
    constructor(){
        this.NotificacionModel = NotificacionModel;
    }
    async desplegarNotificaciones(paginacion){
        const page = paginacion.page;
        const limit = paginacion.limit;

        const skip = (page - 1) * limit;

        const notificaciones = 
            await this.model
                .populate("destinatario", "nombre")
                .populate("remitente", "nombre")
                .skip(skip)
                .limit(limit);

        const total = this.model.countDocuments();

        return {
            notificaciones,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

}