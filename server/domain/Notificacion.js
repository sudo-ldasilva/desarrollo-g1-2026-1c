export class Notificacion {
    constructor(id, destinatario, remitente, mensaje, fechaHoraCreacion) {
        this.id = id;
        this.destinatario = destinatario;
        this.remitente = remitente;
        this.mensaje = mensaje;
        this.fechaHoraCreacion = fechaHoraCreacion;
        this.leida = false;
        this.fechaHoraLeida = 0;
    }

    marcarComoLeida() {
        if (this.leida) {
            return;
        }

        this.leida = true;
        this.fechaHoraLeida = new Date(Date.now());
    }
}
