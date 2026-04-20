import CoberturaEspecialidad from './CoberturaEspecialidad.js';
import CoberturaPractica from'./CoberturaPractica.js';

const NivelCobertura = {
    TOTAL: "Total",
    PARCIAL: "Parcial",
    NO_CUBIERTA: "No cubierta"
};

class Plan {
    constructor(id,nombre,coberturasEspecialidad, coberturasPractica){
        this.id = id;
        this.nombre = nombre;
        this.coberturasEspecialidad = coberturasEspecialidad;
        this.coberturasPractica = coberturasPractica;
    }

    obtenerCobertura(objetivo) {
        if (objetivo instanceof CoberturaEspecialidad) {
            return this.coberturasEspecialidad.find( (e) => e.especialidad() == objetivo ).nivel()
        } else if (objetivo instanceof CoberturaPractica) {
            return this.coberturasPractica.find( (p) => p.practica() == objetivo).nivel()
        } else {
            console.error("Campo no reconocido para determinar cobertura!");
        }
    }
}