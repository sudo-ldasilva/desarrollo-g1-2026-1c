class Agenda {
    //cual es el rango de fechas a generar?
    //Ejemplo: genera los turnos de los proximos 30 dias?
    generarTurnosPara(objetivo, medico) {
        let puedeRealizarlo = objetivo.puedeRealizarlo(medico);
        if (!puedeRealizarlo.puede) {
            throw new Error(puedeRealizarlo.msg);
        }

        const turnos = objetivo.generarTurnos(medico);
        return turnos; 
    }

    refrescarTurnoSegunDisponibilidad(medico) {
        // TODO Return Turnos[] que hace esto?
    }
}

export default Agenda;
