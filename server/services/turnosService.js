import TurnosRepository from "../repositories/turnosRepository.js";

export default class TurnosService{
    constructor() {
        this.turnosRepository = new TurnosRepository();
    }

    toDTO(turno) {
        const servicio = turno.especialidad
            ? {
                tipo: "especialidad",
                nombre: turno.especialidad.nombre,
                duracion: turno.especialidad.duracionTurnoEnMins,
                costo: turno.especialidad.costoConsulta
            }
            : turno.practica
                ? {
                    tipo: "practica",
                    nombre: turno.practica.nombre,
                    duracion: turno.practica.duracionTurnoEnMins,
                    costo: turno.practica.costoConsulta
                }
                : null;
        
        return {
            id: turno._id,
            fechaHora: turno.fechaHora,
            medico: turno.medico ? {
                nombre: turno.medico.nombre
            } : null,
            servicio, //puede ser especialidad/práctica
            sede: turno.sede ? {
                nombre: turno.sede.nombre,
                direccion: turno.sede.direccion
            } : null,
            estado: turno.estado
            // costo calculado (cambia segun paciente que consulta)
            // tipo de cobertura  (cambia segun paciente que consulta)
        };
    }

    async buscarPaginado(pagina, limite) {
        const { turnos, total, page, totalPages } =
        await this.turnosRepository.buscarPaginado(pagina, limite);

        return {
            turnos: turnos.map(t => this.toDTO(t)),
            total,
            page,
            totalPages
        };
    }
}