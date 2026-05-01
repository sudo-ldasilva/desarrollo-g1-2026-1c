import Especialidad from "./Especialidad.js";
import Practica from "./Practica.js";
import Turno from "./Turno.js";

class Agenda {
    generarTurnosPara(objetivo, medico) {
        let puedeRealizarlo = objetivo.puedeRealizarlo(medico);
        if (!puedeRealizarlo.puede) {
            throw new Error(puedeRealizarlo.msg);
        }

        if (!medico.sedes || medico.sedes.length === 0) {
            throw new Error(`Médico ${medico.nombre} no tiene sedes asignadas`);
        }

        const turnos = [];
        medico.disponibilidades.forEach((disponibilidad) => {
            const turno = new Turno({
                medico: medico,
                //TODO
                fechaHora: disponibilidad, //revisar tipo de datos esperados y recibidos
                //TODO
                sede: medico.sedes[0],
                practica: (objetivo instanceof Practica) ? objetivo : undefined
            });

            turnos.push(turno);
        });

        return turnos; // Turnos disponibles
    }

    refrescarTurnoSegunDisponibilidad(medico) {
        // TODO Return Turnos[] que hace esto?
    }
}

export default Agenda;
