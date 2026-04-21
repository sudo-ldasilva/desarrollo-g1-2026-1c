import { DiaSemana } from "./DiaSemana";

class DisponibilidadHoraria{
    constructor(diaSemana, horaDesde, horaHasta){
        this.diaSemana = diaSemana;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
    }

    get diaSemana() { return this.diaSemana; }
    get horaDesde() { return this.horaDesde; }
    get horaHasta() { return this.horaHasta; }

    set diaSemana(dia) { return this.diaSemana = dia; }
    set horaDesde(horaDesde) { return this.horaDesde = horaDesde; }
    set horaHasta(horaHasta) { return this.horaHasta = horaHasta; }

    //Determinamos que el tiempo por turno va a ser de una hora. 
    //Pero queremos determinar cúantos bloques de una hora tendrá cada médico para que luego se le asignen turnos

}
