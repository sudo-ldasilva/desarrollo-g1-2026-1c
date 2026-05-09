import DiaSemana from "./DiaSemana.js";

export const DIAS_A_GENERAR_TURNOS = 90;

class Agenda {
    //cual es el rango de fechas a generar?
    //Ejemplo: genera los turnos de los proximos 30 dias?
    generarTurnosPara(objetivo, medico) {
        let puedeRealizarlo = objetivo.puedeRealizarlo(medico);
        if (!puedeRealizarlo.puede) {
            throw new Error(puedeRealizarlo.msg);
        }

        if (!medico.tieneAlgunaSede()) {
            throw new Error(`Médico ${medico.nombre} no tiene sedes asignadas`);
        }

        const turnos = [];

        const now = new Date(Date.now());
        const nombreDeDias = [DiaSemana.DOMINGO, DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES];

        for (const i in DIAS_A_GENERAR_TURNOS) {
            const fecha = new Date();
            fecha.setDate(now.getDate() + i); // Avanza la fecha en `i` días. Fuente: https://stackoverflow.com/a/563442

            const horariosDisponibles = medico.disponibilidades().filter((disponibilidad) => disponibilidad.diaSemana() === nombreDeDias[fecha.getDay()]);
            horariosDisponibles.forEach((horario) => {
                fecha.setHours(horario.horaDesde(), 0, 0, 0);

                // TODO Consultar en la base de datos si el turno en esa fecha ya existe

                turnos.push(objetivo.generarTurno(medico, fecha));
            });
        }
        return turnos;
    }

    refrescarTurnoSegunDisponibilidad(medico) {
        // TODO Return Turnos[] que hace esto?
    }
}

export default Agenda;
