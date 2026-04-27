import Especialidad from "./Especialidad.js";
import Practica from "./Practica.js";
import Turno from "./Turno.js";
import { EstadoTurno } from "./EstadoTurno.js";

class Agenda {
    generarTurnosPara(objetivo, medico) {
        let puedeRealizarlo = objetivo.puedeRealizarlo(medico);
        if (!puedeRealizarlo.puede) {
            throw new Error(puedeRealizarlo.msg);
        }

        const turnos = [];
        medico.disponibilidades.forEach((disponibilidad) => {
            const turno = new Turno({
                // id de donde sale?, Puede ser un UUID o un auto-incrementable
                medico : medico,
                paciente: null, // hay que poner paciente null? O de donde se obtiene?
                //fechaHora, se saca de disp
                //sede, medico tiene sedes[], cual se elige?
                practica: (objetivo instanceof Practica) ? objetivo : undefined, //practica
                estado: EstadoTurno.DISPONIBLE,
                //historial de estados
                //costo ? de donde sale
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
