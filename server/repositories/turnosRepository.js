import {TurnoModel} from "../models/turnoSchema.js";

export default class TurnosRepository {
    constructor() {
        this.model = TurnoModel;
    } 

    async buscarPaginado(filtros, paginacion, ordenamiento) {
        const page = paginacion.page;
        const limit = paginacion.limit;
        const sort = ordenamiento;

        const query = armarQuery(filtros);

        //cuantos documentos hay que saltar
        const skip = (page - 1) * limit;

        const turnos =
            await this.model
                .find(query)
                .sort(sort)
                .populate("medico", "nombre")
                .populate("sede", "nombre direccion")
                .populate("servicio", "nombre duracionTurnoEnMins costoConsulta")
                .skip(skip)
                .limit(limit);

        const total =
            await this.model.countDocuments(query);

        return {
            turnos,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            sort
        };
    }

    async buscarPorId(id) {
        return await this.model.findById(id)
            .populate("medico")
            .populate("paciente")
            .populate("sede")
            .populate("servicio");
    }

    async actualizar(turnoDocument){
        return await turnoDocument.save();
    }
}

function armarQuery(filtros) {
    const query = {};

    if (filtros.medico) {
        query.medico = filtros.medico;
    }

    if (filtros.especialidad) {
        query.servicio = filtros.especialidad;
    }
        
    if (filtros.practica) {
        query.practica = filtros.practica;
    }

    if (filtros.sede) {
        query.sede = filtros.sede;
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