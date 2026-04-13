export class Especialidad{
    constructor(id,nombre,duracionTurnoEnMins,costoConsulta){
        this.id = id;
        this.nombre = nombre;
        this.duracionTurnoEnMins = duracionTurnoEnMins;
        this.costoConsulta = costoConsulta;
    }

    get id() { return this.id };
    get nombre() { return this.nombre; }
    get duracionTurnoEnMins() { return this.duracionTurnoEnMins; }
    get costoConsulta() { return this.costoConsulta; }
}