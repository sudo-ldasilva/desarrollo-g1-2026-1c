import Especialidad from "./Especialidad.js"
import Practica from "./Practica.js"

class Agenda {
    generarTurnosPara(objetivo, medico) {
        if (objetivo instanceof Especialidad) {
            // TODO
        } else if (objetivo instanceof Practica) {
            // TODO
        } else {
            // ERROR
        }
    }

    refrescarTurnoSegunDisponibilidad(medico) {
        // TODO Return Turnos[]
    }

}
