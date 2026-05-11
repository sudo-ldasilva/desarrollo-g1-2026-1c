import crypto from "crypto";

export class Medico {
    constructor({ id = crypto.randomUUID(), usuario, matricula, nombre }){
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;

        //valores no indispensables para que el medico exista
        this.especialidades = [];
        this.practicas = [];
        this.sedes = [];
        this.disponibilidades = [];
    }

    get disponibilidades() {
        return this.disponibilidades;
    }

    definirDisponibilidad(disponibilidad){
        this.disponibilidades.push(disponibilidad);
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
        return !this.sedes || this.sedes.length === 0;
    }
}
