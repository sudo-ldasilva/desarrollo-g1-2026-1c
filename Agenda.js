import Especialidad from "./Especialidad.js"
import Practica from "./Practica.js"

class Agenda {
    generarTurnosPara(objetivo, medico) {
        if (objetivo instanceof Especialidad) {

        } else if (objetivo instanceof Practica) {

        } else {
            // ERROR
        }
    }

    refrescarTurnoSegunDisponibilidad(medico) {
        // TODO Return Turnos[]
    }

}