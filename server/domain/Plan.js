import CoberturaEspecialidad from "./CoberturaEspecialidad.js";
import CoberturaPractica from "./CoberturaPractica.js";

class Plan {
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

export default Plan;
