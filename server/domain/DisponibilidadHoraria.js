class DisponibilidadHoraria {
    constructor({diaSemana, horaDesde, horaHasta, sede, servicio}) {
        this.diaSemana = diaSemana;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
        this.sede = sede;
        this.servicio = servicio; //practica o especialidad
        this.duracionEnMins = duracionEnMinutos(horaDesde, horaHasta);
    }


    generarSlots(fecha) {

        const slots = [];

        const duracion =
        this.servicio.duracionTurnoEnMins;

        const [horaDesde, minDesde] =
        this.horaDesde.split(":").map(Number);

        const [horaHasta, minHasta] =
        this.horaHasta.split(":").map(Number);

        const inicio = new Date(fecha);
        inicio.setHours(horaDesde, minDesde, 0, 0);

        const fin = new Date(fecha);
        fin.setHours(horaHasta, minHasta, 0, 0);

        const actual = new Date(inicio);

        while (actual <= fin) {

            const finSlot = new Date(actual);

            finSlot.setMinutes(
                finSlot.getMinutes() + duracion
            );

            if (finSlot > fin) {
                break;
            }

            slots.push(new Date(actual));

            actual.setMinutes(
                actual.getMinutes() + duracion
            );
        }

        return slots;
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
