import NotificacionesRepository from "../repositories/notificacionesRepository.js";
import PacientesRepository from "../repositories/pacientesRepository.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors/AppError.js";

export default class NotificacionesService{
    constructor(){
        this.NotificacionesRepository = new NotificacionesRepository();
        this.PacientesRepository = new PacientesRepository();
        this.UsuarioRepository = new UsuarioRepository();
    }

    async desplegarNotificaciones(usuarioId,paginacion, filtros = {}) { 
        const usuarioDestinatario = await this.UsuarioRepository.buscarPorId(usuarioId);

        if(!usuarioDestinatario) {
            throw new NotFoundError("No se encuentra usuario");
        }

        const {notificaciones, total, page, totalPages} = 
            await this.NotificacionesRepository.desplegarNotificaciones(usuarioDestinatario._id,paginacion, filtros);
        
        return {
            notificaciones: notificaciones.map(n => notificacionToDto(n)),
            total,
            page,
            totalPages
        };
    
    }

    async obtenerNotificacionPorId(id) {
        const notificacion = await this.NotificacionesRepository.obtenerPorId(id);
    
        return notificacion;
    }

    async modificarEstadoLectura(id, usuarioId){
        const notificacion = await this.NotificacionesRepository.obtenerPorId(id);
        
        if(!notificacion) {
            throw new NotFoundError("No se encuentra notificacion");
        }

        if(usuarioId != notificacion.destinatario._id) {
            throw new ForbiddenError("El usuario no es destinatario");
        }

        if(notificacion.leida) {
            throw new BadRequestError("La notificacion ya esta leida");
        }

        notificacion.marcarComoLeida();
        
        const notificacionActualizada = await this.NotificacionesRepository.guardar(notificacion);

        return notificacionToDto(notificacionActualizada);
    }

}

function notificacionToDto(notificacion) {
    return {
        _id: notificacion._id,
        destinatario: notificacion.destinatario.nombreUsuario,
        remitente:  notificacion.remitente.nombreUsuario,
        mensaje: notificacion.mensaje,
        fechaHoraCreacion: notificacion.fechaHoraCreacion,
        fechaHoraLeida: notificacion.fechaHoraLeida,
        leida: notificacion.leida,
    };
}