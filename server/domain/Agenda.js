import Especialidad from "./Especialidad.js";
import Practica from "./Practica.js";
import Turno from "./Turno.js";
import { EstadoTurno } from "./EstadoTurno.js";

class Agenda {
    generarTurnosPara(objetivo, medico) {
        if (objetivo instanceof Especialidad) { 
            if (!medico.tieneEspecialidad(objetivo)) { 
                // ERROR
                console.error("El medico no tiene la especialidad");
                return [];
            }

        } else if (objetivo instanceof Practica) {
            if (!medico.tienePractica(objetivo)) {
                // ERROR
                console.error("El medico no tiene la práctica");
                return [];
            }
        } else {
            console.error("El objeto no es una practica ni una especialidad");
            return [];
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
