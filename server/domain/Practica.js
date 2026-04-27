import Turno from "Turno.js";
import { EstadoTurno } from "./EstadoTurno";

export class Practica {
    constructor(id,codigo,nombre,duracionTurnoEnMins,costo) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.duracionTurnoEnMins = duracionTurnoEnMins;
        this.costo = costo;
    }

    //desde el dia de hoy a 30 dias,
    //por cada disponibilidad del medico (dia, horaDesde, horaHasta, duracionEnMins)
    //genero los turnos necesarios por cada dia en los dias que entran en el rango 
    generarTurnos(medico) {
        const turnos = [];
        
        //TODO
        // let turno = new Turno({
        //     medico: medico,
        //     paciente: null,
        //     practica: this,
        //     fechaHora: ,
        //     estado: EstadoTurno.DISPONIBLE,
        //     costo: this.costo
        // });

        return turnos;
    }
  
    puedeRealizarlo(medico) {
        return (medico.tienePractica(this))
            ? { msg: "", puede: true }
            : { msg: "El médico no realiza dicha practica", puede: false };
    }
}
