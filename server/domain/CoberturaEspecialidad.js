export class CoberturaEspecialidad{
    constructor(especialidad,nivel){
        this.especialidad = especialidad;
        this.nivel = nivel;
    }

    obtenerNivelDe(plan) {
        const cobertura = plan.coberturasEspecialidad.find(
            e => e.especialidad === this.especialidad
        );
        if (!cobertura) throw new Error(`Especialidad ${this.especialidad.nombre} no cubierta en este plan`);
        return cobertura.nivel;
    }

}
