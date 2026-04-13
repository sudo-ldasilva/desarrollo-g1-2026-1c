export class Practica{
    constructor(id,codigo,nombre,duracionTurnoEnMins,costo) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.duracionTurnoEnMins = duracionTurnoEnMins;
        this.costo = costo;
    }

    get id() { return this.id; }
    get codigo() { return this.codigo; }
    get nombre() { return this.nombre; }
    get duraciduracionTurnoEnMins() { return this.duracionTurnoEnMins; }
    get costo() { return this.costo; }
}