export class Especialidad {
    constructor(id,nombre,duracionTurnoEnMins,costoConsulta){
        this.id = id;
        this.nombre = nombre;
        this.duracionTurnoEnMins = duracionTurnoEnMins;
        this.costoConsulta = costoConsulta;
    }

    generarTurnos(medico){
        const turnos = [];
        //TODO
        return turnos;
    }

    puedeRealizarlo(medico) {
        return (medico.tieneEspecialidad(this))
            ? { msg: "", puede: true }
            : { msg: "El médico no atiende dicha especialidad", puede: false };
    }
}
