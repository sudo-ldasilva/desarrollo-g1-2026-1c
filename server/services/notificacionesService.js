import NotificacionesRepository from "../repositories/notificacionesRepository.js";

export default class NotificacionesService{
    constructor(){
        this.NotificacionesRepository = NotificacionesRepository;
    }

    async desplegarNotificaciones(paginacion, filtros = {}) { 
        const { notificaciones, total, page, totalPages } =
            await this.NotificacionesRepository.desplegarNotificaciones(paginacion, filtros);
    
        return {
            notificaciones,
            total,
            page,
            totalPages
        };
    }

    async obtenerNotificacionPorId(id) {
        const notificacion = await NotificacionesRepository.obtenerPorId(id);
    
        return notificacion;
    }


    async modificarEstadoLectura(id){
        const datosParaActualizar = {
            leida : true,
            fechaHoraLeida: new Date()
        };
        const notificacionActualizada = await NotificacionesRepository.actualizar(id, datosParaActualizar);

        return notificacionActualizada;
    }

}