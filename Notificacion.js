export class Notificacion {
    constructor(destinatario, remitente, mensaje, fechaHoraCreacion) {
        // TODO Autogenerar ID
        this.destinatario = destinatario
        this.remitente = remitente
        this.mensaje = mensaje
        this.fechaHoraCreacion = fechaHoraCreacion
        this.leida = false
        this.fechaHoraLeida = 0
    }

    marcarComoLeida() {
        if (leida) {
            return
        }
        
        leida = true
        fechaHoraLeida = new Date(Date.now())
    }
}