import Turno from "./Turno.js";

export class Especialidad {
    constructor(id,nombre,duracionTurnoEnMins,costoConsulta){
        this.id = id;
        this.nombre = nombre;
        this.duracionTurnoEnMins = duracionTurnoEnMins;
        this.costoConsulta = costoConsulta;
    }

    generarTurnos(medico, fecha){
        return new Turno({
            "medico": medico,
            "fechaHora": fecha,
        });
    }

    puedeRealizarlo(medico) {
        return (medico.tieneEspecialidad(this))
            ? { msg: "", puede: true }
            : { msg: "El médico no atiende dicha especialidad", puede: false };
    }
}
