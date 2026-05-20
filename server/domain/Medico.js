export class Medico {
    constructor({ usuario, matricula, nombre }){
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;

        //valores no indispensables para que el medico exista
        this.especialidades = [];
        this.practicas = [];
        this.sedes = [];
        this.disponibilidades = [];
    }

    agregarDisponibilidad(disponibilidad){
        this.disponibilidades.push(disponibilidad);
    }

    eliminarDisponibilidad(disponibilidad){
        this.disponibilidades = this.disponibilidades.filter( (e) => e !== disponibilidad);
    }

    definirEspecialidad(especialidad) {
        this.especialidades.push(especialidad);
    }

    definirPractica(practica) {
        this.practicas.push(practica);
    }

    definirSede(sede) {
        this.sedes.push(sede);
    }

    tieneEspecialidad(especialidad) {
        return this.especialidades.includes(especialidad);
    }

    tienePractica(practica) {
        return this.practicas.includes(practica);
    }

    tieneAlgunaSede() {
        return this.sedes && this.sedes.length > 0;
    }
}
