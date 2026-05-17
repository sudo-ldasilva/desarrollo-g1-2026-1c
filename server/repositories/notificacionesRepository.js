import { NotificacionModel } from "../models/notificacionSchema.js";

export default class NotificacionesRepository{
    constructor(){
        this.model = NotificacionModel;
    }
    async desplegarNotificaciones(paginacion){
        const page = paginacion.page;
        const limit = paginacion.limit;

        const skip = (page - 1) * limit;

        const notificaciones = 
            await this.model
                .find()
                .populate("destinatario", "nombreUsuario")
                .populate("remitente", "nombreUsuario")
                .skip(skip)
                .limit(limit);

        const total = await this.model.countDocuments();

        return {
            notificaciones,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

}