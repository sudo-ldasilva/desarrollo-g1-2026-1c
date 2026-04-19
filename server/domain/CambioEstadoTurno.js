class CambioEstadoTurno{
   constructor(fechaHoraIngreso, estado, turno, usuario, motivo) {
      this.fechaHoraIngreso = fechaHoraIngreso
      this.estado = estado
      this.turno = turno
      this.usuario = usuario
      this.motivo = motivo
   }

    get fechaHoraIngreso() { return this.fechaHoraIngreso; }
    get estado() { return this.estado; }
    get turno() { return this.turno; }
    get usuario() { return this.usuario; }
    get motivo() { return this.motivo; }
}