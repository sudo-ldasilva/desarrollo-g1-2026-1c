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


// generarTurnosPara(objetivo, medico) {
//         let puedeRealizarlo = objetivo.puedeRealizarlo(medico);
//         if (!puedeRealizarlo.puede) {
//             throw new Error(puedeRealizarlo.msg);
//         }

//         if (!medico.tieneAlgunaSede()) {
//             throw new Error(`Médico ${medico.nombre} no tiene sedes asignadas`);
//         }

//         const turnos = [];

//         const now = new Date(Date.now());
//         const nombreDeDias = [DiaSemana.DOMINGO, DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES];

//         for (const i in DIAS_A_GENERAR_TURNOS) {
//             const fecha = new Date();
//             fecha.setDate(now.getDate() + i); // Avanza la fecha en `i` días. Fuente: https://stackoverflow.com/a/563442

//             const horariosDisponibles = medico.disponibilidades().filter((disponibilidad) => disponibilidad.diaSemana() === nombreDeDias[fecha.getDay()]);
//             horariosDisponibles.forEach((horario) => {
//                 fecha.setHours(horario.horaDesde(), 0, 0, 0);

//                 // TODO Consultar en la base de datos si el turno en esa fecha ya existe

//                 turnos.push(objetivo.generarTurno(medico, fecha));
//             });
//         }
//         return turnos;
//     }