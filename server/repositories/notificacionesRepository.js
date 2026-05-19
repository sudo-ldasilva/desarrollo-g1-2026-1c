import { NotificacionModel } from "../models/notificacionSchema.js";

export default class NotificacionesRepository{
    constructor(){
        this.model = NotificacionModel;
    }
    async desplegarNotificaciones(paginacion, filtros = {}){
        const page = paginacion.page;
        const limit = paginacion.limit;

        const skip = (page - 1) * limit;

        const notificaciones = 
            await this.model
                .find(filtros)
                .populate("destinatario", "nombreUsuario")
                .populate("remitente", "nombreUsuario")
                .skip(skip)
                .limit(limit);

        const total = await this.model.countDocuments(filtros);

        return {
            notificaciones,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    
    async actualizar(id, datos) {
        return await NotificacionModel.findByIdAndUpdate(
            id, 
            datos, 
            { new: true, runValidators: true }
        );
    }

}