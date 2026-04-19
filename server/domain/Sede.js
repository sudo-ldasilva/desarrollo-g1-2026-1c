export class Sede {
    constructor(id, nombre, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
    }

    get id() { return this.is; }
    get nombre() { return this.nombre; }
    get direccion() { return this.direccion ;}
}