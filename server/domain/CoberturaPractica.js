export class CoberturaPractica{
    constructor(practica,nivel){
        this.practica = practica;
        this.nivel = nivel;
    }

    obtenerNivelDe(plan) {
        const cobertura = plan.coberturasPractica.find(
            p => p.practica === this.practica
        );
        if (!cobertura) throw new Error(`Práctica ${this.practica} no cubierta en este plan`);
        return cobertura.nivel;
    }

}
