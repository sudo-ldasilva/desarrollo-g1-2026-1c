const EstadoTurno = {
    DISPONIBLE: "Disponible",
    RESERVADO: "Reservado",
    CONFIRMADO: "Confirmado",
    CANCELADO: "Cancelado",
    REALIZADO: "Realizado"
}

class Turno {
    constructor(medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo) {
        // TODO Autogenerar ID
        this.medico = medico
        this.paciente = paciente
        this.fechaHora = fechaHora
        this.sede = sede
        this.practica = practica
        this.estado = estado
        this.historialEstados = historialEstados
        this.costo = costo
    }
}