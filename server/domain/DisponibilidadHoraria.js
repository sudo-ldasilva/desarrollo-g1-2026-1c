const DiaSemana = {
    LUNES: 'LUNES',
    MARTES: 'MARTES',
    MIERCOLES: 'MIERCOLES',
    JUEVES: 'JUEVES',
    VIERNES: 'VIERNES',
    SABADO: 'SABADO',
    DOMINGO: 'DOMINGO'
};

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

}
