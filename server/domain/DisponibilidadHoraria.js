class DisponibilidadHoraria {
    constructor(diaSemana, horaDesde, horaHasta) {
        this.diaSemana = diaSemana;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
        this.duracionEnMins = duracionEnMinutos(horaDesde, horaHasta);
    }

    get diaSemana() { return this._diaSemana; }
    get horaDesde() { return this._horaDesde; }
    get horaHasta() { return this._horaHasta; }

    set diaSemana(dia) { this._diaSemana = dia; }
    set horaDesde(horaDesde) { this._horaDesde = horaDesde; }
    set horaHasta(horaHasta) { this._horaHasta = horaHasta; }

}

function aMinutos(hora) {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
}

function duracionEnMinutos(desde, hasta) {
    const minDesde = aMinutos(desde);
    const minHasta = aMinutos(hasta);

    if (minHasta < minDesde) {
        return (24 * 60 - minDesde) + minHasta;
    }

    return minHasta - minDesde;
}

export default DisponibilidadHoraria;
