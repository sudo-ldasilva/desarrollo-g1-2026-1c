class Medico {
    constructor(id, usuario, matricula, nombre, especialidades, practicas, sedes, disponibilidades){
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;
        this.especialidades = especialidades;
        this.practicas = practicas;
        this.sedes = sedes;
        this.disponibilidades = disponibilidades;
    }

    definirDisponibilidad(disponibilidad){
        this.disponibilidades.push(disponibilidad);
    }

    tieneEspecialidad(especialidad) {
        return this.especialidades.includes(especialidad);
    }

    tienePractica(practica) {
        return this.practicas.includes(practica);
    }
}
