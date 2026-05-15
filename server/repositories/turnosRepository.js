import {TurnoModel} from "../models/turnoSchema.js";


export default class TurnosRepository {
    constructor() {
        this.model = TurnoModel;
    } 

    async buscarPaginado(filtros, paginacion) {
        const page = paginacion.page;
        const limit = paginacion.limit;

        const query = armarQuery(filtros);

        //cuantos documentos hay que saltar
        const skip = (page - 1) * limit;

        const turnos =
            await this.model
                .find(query)
                .populate("medico", "nombre")
                .populate("sede", "nombre direccion")
                .populate("especialidad", "nombre duracionTurnoEnMins costoConsulta")
                .populate("practica", "nombre duracionTurnoEnMins costoConsulta")
                .skip(skip)
                .limit(limit);

        const total =
            await this.model.countDocuments(query);

        return {
            turnos,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

}

function armarQuery(filtros) {
    const query = {};

    if (filtros.medicoId) {
        query.medico = filtros.medicoId;
    }

    if (filtros.especialidadId) {
        query.especialidad = filtros.especialidadId;
    }
        
    if (filtros.practicaId) {
        query.practica = filtros.practicaId;
    }

    if (filtros.sedeId) {
        query.sede = filtros.sedeId;
    }

    if (filtros.fechaInicio || filtros.fechaFin) {
        query.fechaHora = {};

        if (filtros.fechaInicio) {
            query.fechaHora.$gte = new Date(filtros.fechaInicio);
        }

        if (filtros.fechaFin) {
            query.fechaHora.$lte = new Date(filtros.fechaFin);
        }
    }

    return query;
}