const EstadoTurno = {
    DISPONIBLE: "Disponible",
    RESERVADO: "Reservado",
    CONFIRMADO: "Confirmado",
    CANCELADO: "Cancelado",
    REALIZADO: "Realizado"
}

class Turno {
    constructor(id, medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo) {
        this.id = id
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
