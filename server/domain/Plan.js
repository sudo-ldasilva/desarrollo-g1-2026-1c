export class Plan {
    constructor(id, nombre, coberturasEspecialidad, coberturasPractica) {
        this.id = id;
        this.nombre = nombre;
        this.coberturasEspecialidad = coberturasEspecialidad;
        this.coberturasPractica = coberturasPractica;
    }

    obtenerCobertura(practicaOEspecialidad) {
        return practicaOEspecialidad.obtenerNivelDe(this);
    }

}
