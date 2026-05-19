import Turno from "./Turno.js";
import { obtenerDiaSemana } from "./DiaSemana.js";
import { EstadoTurno } from "./EstadoTurno.js";

export class Agenda {
    //recorre rango de fechas
    //si el dia de la fecha concuerda con disponibilidad
    //divide la disponibilidad
    //instancia
    generarTurnosPara(medico, fechaDesde, fechaHasta) {

        const turnos = [];

        const fechaActual = new Date(fechaDesde);
        fechaActual.setHours(0,0,0,0);

        while (fechaActual <= fechaHasta) {

            const diaSemana =
            obtenerDiaSemana(fechaActual);

            const disponibilidades =
            medico.disponibilidades.filter(
                d => d.diaSemana === diaSemana
            );

            for (const disponibilidad of disponibilidades) {

                const slots =
                disponibilidad.generarSlots(fechaActual);

                for (const fechaHora of slots) {

                    const turno = new Turno({
                        medico: medico,
                        fechaHora: fechaHora,

                        sede: disponibilidad.sede,
                        servicio: disponibilidad.servicio,

                        estado: EstadoTurno.DISPONIBLE
                    });

                    turnos.push(turno);
                }
            }

            fechaActual.setDate(
                fechaActual.getDate() + 1
            );
        }

        return turnos;
    }


    refrescarTurnoSegunDisponibilidad(medico) {
        // TODO Return Turnos[] que hace esto?
    }
}
