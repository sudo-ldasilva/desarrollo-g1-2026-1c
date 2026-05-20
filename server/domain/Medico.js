export class Medico {
    constructor({ usuario, matricula, nombre }){
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;

        //valores no indispensables para que el medico exista
        this._especialidades = [];
        this._practicas = [];
        this._sedes = [];
        this._disponibilidades = [];
    }

    get disponibilidades() {
        return this._disponibilidades;
    }

    definirDisponibilidad(disponibilidad){
        this._disponibilidades.push(disponibilidad);
    }

    definirEspecialidad(especialidad) {
        this._especialidades.push(especialidad);
    }

    definirPractica(practica) {
        this._practicas.push(practica);
    }

    definirSede(sede) {
        this._sedes.push(sede);
    }

    tieneEspecialidad(especialidad) {
        return this._especialidades.includes(especialidad);
    }

    tienePractica(practica) {
        return this._practicas.includes(practica);
    }

    tieneAlgunaSede() {
        return this._sedes && this._sedes.length > 0;
    }
}
