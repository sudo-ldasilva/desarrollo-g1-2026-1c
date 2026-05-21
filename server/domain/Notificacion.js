export class Notificacion {
    constructor({destinatario, remitente, mensaje}) {
        this.destinatario = destinatario;
        this.remitente = remitente;
        this.mensaje = mensaje;
        this.fechaHoraCreacion = new Date();
        this.leida = false;
        this.fechaHoraLeida = null;
    }

    marcarComoLeida() {
        if (this.leida) {
            return;
        }

        this.leida = true;
        this.fechaHoraLeida = new Date();
    }
}
