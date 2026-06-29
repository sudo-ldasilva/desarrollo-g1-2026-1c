import { NotificacionModel } from "../models/NotificacionModel.js";

export default class NotificacionesRepository{
    constructor(){
        this.model = NotificacionModel;
    }
    async desplegarNotificaciones(usuarioId,paginacion, filtros = {}){
        const page = paginacion.page;
        const limit = paginacion.limit;

        const skip = (page - 1) * limit;

        const notificaciones =
            await this.model
                .find({destinatario: usuarioId})
                .find(filtros)
                .populate("destinatario", "nombreUsuario")
                .populate("remitente", "nombreUsuario")
                .skip(skip)
                .limit(limit)
                .sort({ leida: 1, fechaHoraCreacion: -1 }); 

        const total = await this.model.countDocuments({destinatario: usuarioId, ...filtros});

        return {
            notificaciones,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    async obtenerPaginasConNoLeidos(usuarioId, limit) {
        const todas = await this.model
            .find({ destinatario: usuarioId })
            .sort({ fechaHoraCreacion: -1 })
            .select("leida")
            .lean();

        const paginas = new Set();
        todas.forEach((notif, index) => {
            if (!notif.leida) {
                paginas.add(Math.floor(index / limit) + 1);
            }
        });
        return [...paginas];
    }

    async obtenerPorId(id) {
        return await this.model.findById(id)
            .populate("destinatario", "nombreUsuario")
            .populate("remitente", "nombreUsuario");
    }


    async actualizar(id, datos) {
        return await this.model.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );
    }

    async guardar(notificacion) {
        return await notificacion.save();
    }


    async crear(notificacion) {
        return await this.model.create(notificacion);
    }

}
