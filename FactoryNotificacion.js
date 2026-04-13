class FactoryNotificacion {
    crearSegunEstadoTurno(turno) {
        // TODO Está bien?
        // Al reservar un turno, se notifica al médico indicando paciente y servicio solicitado (especialidad o práctica)
        return new Notificacion(
            turno.medico,
            turno.paciente,
            "El paciente " + paciente.nombre() + " solicito el servicio " + turno.practica(),
        )
    }
}