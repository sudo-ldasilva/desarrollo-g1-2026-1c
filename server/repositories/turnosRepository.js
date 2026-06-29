import {TurnoModel} from "../models/TurnoModel.js";

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
                .populate("servicio", "nombre duracionTurnoEnMins costo")
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

    async buscarPorMedico(medicoId, page, limit, filtros) {
        const skip = (page - 1) * limit;
        const query = armarQuery(filtros);

        // Debería ser funcional tanto para medicos como para médicos?
        //  Es decir, consultar los turnos que tengo hechos/programados/cancelados como médico y ver los distintos medicos o como medico ver tu historial de turnos.
        const turnos = await this.model.find({ medico: medicoId })
            .find(query)
            .skip(skip)
            .limit(limit)
            .populate({
                path: "paciente",
                select: "nombre obraSocial plan",
                populate: [
                    { path: "obraSocial", select: "nombre" },
                    { path: "plan", select: "nombre" }
                ]
            })
            .populate("sede", "nombre direccion")
            .populate("fechaHora", "hora")
            .populate("servicio", "nombre costo");

        const total = await this.model.countDocuments({ medico: medicoId, ...query });

        return {
            turnos: turnos,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    async buscarPorPaciente(pacienteId, page, limit, filtros) {
        const skip = (page - 1) * limit;
        const query = armarQuery(filtros);

        // Debería ser funcional tanto para pacientes como para médicos?
        //  Es decir, consultar los turnos que tengo hechos/programados/cancelados como médico y ver los distintos pacientes o como paciente ver tu historial de turnos.
        const turnos = await this.model.find({ paciente: pacienteId })
            .find(query)
            .skip(skip)
            .limit(limit)
            .populate("medico", "nombre matricula")
            .populate("sede", "nombre direccion")
            .populate("fechaHora", "hora")
            .populate("servicio", "nombre costo");

        const total = await this.model.countDocuments({ paciente: pacienteId, ...query });

        return {
            turnos: turnos,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

}

function armarQuery(filtros) {
    const query = {};

    if (filtros.medico) {
        query.medico = filtros.medico;
    }

    if (filtros.estado) {
        query.estado = filtros.estado;
    }

    if (filtros.servicio) {
        query.servicio = filtros.servicio;
    }

    if (filtros.tipoServicio) {
        query.tipoServicio = filtros.tipoServicio;
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
