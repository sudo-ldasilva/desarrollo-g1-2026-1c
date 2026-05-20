import NotificacionesRepository from "../repositories/notificacionesRepository.js";
import PacientesRepository from "../repositories/pacientesRepository.js";
import { NotFoundError } from "../errors/AppError.js";

export default class NotificacionesService{
    constructor(){
        this.NotificacionesRepository = new NotificacionesRepository();
        this.PacientesRepository = new PacientesRepository();
    }

    async desplegarNotificaciones(usuarioId,paginacion, filtros = {}) { 
        const paciente = await this.pacientesRepository.buscarPorUsuarioId(usuarioId);

        if(!paciente) {
            throw new NotFoundError("No se encuentra usuario paciente");
        }

        return await this.NotificacionesRepository.desplegarNotificaciones(paciente._id,paginacion, filtros);
    
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