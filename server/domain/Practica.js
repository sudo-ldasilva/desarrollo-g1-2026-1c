import Turno from "./Turno.js";

export class Practica {
    constructor(id,codigo,nombre,duracionTurnoEnMins,costo) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.duracionTurnoEnMins = duracionTurnoEnMins;
        this.costo = costo;
    }

    generarTurnos(medico, fecha){
        return new Turno({
            "medico": medico,
            "fechaHora": fecha,
            "practica": this,
        });
    }

    puedeRealizarlo(medico) {
        return (medico.tienePractica(this))
            ? { msg: "", puede: true }
            : { msg: "El médico no realiza dicha practica", puede: false };
    }
}
