import { DiaSemana } from "./DiaSemana.js";

class DisponibilidadHoraria {
    constructor(diaSemana, horaDesde, horaHasta) {
        this.diaSemana = diaSemana;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
    }

    get diaSemana() { return this._diaSemana; }
    get horaDesde() { return this._horaDesde; }
    get horaHasta() { return this._horaHasta; }

    set diaSemana(dia) { this._diaSemana = dia; }
    set horaDesde(horaDesde) { this._horaDesde = horaDesde; }
    set horaHasta(horaHasta) { this._horaHasta = horaHasta; }
}

export default DisponibilidadHoraria;
