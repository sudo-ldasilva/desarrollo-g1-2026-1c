import { MedicoModel } from "../models/MedicoModel.js";
import { NotFoundError, BadRequestError } from "../errors/AppError.js";
import mongoose from "mongoose";

export class MedicoRepository {
    constructor() {
        this.model = MedicoModel;
    }

    validarFiltros(filtros) {
        if (filtros.especialidad !== undefined && !mongoose.isValidObjectId(filtros.especialidad)) {
            throw new BadRequestError(`En el filtro 'especialidad': '${filtros.especialidad} no es un ID válido.`);
        }

        if (filtros.practica !== undefined && !mongoose.isValidObjectId(filtros.practica)) {
            throw new BadRequestError(`En el filtro 'practica': '${filtros.practica} no es un ID válido.`);
        }

        if (filtros.sedes !== undefined && !mongoose.isValidObjectId(filtros.sedes)) {
            throw new BadRequestError(`En el filtro 'sede': '${filtros.sedes} no es un ID válido.`);
        }
    }

    async obtenerPaginados(numeroPagina, limitePorPagina, filtros = {}) {
        //cuantos documentos hay que saltar
        const skip = (numeroPagina - 1) * limitePorPagina;

        this.validarFiltros(filtros);

        const totalMedicos = await this.model.countDocuments(filtros);
        if (totalMedicos <= skip) {
            throw new BadRequestError("La pagina solicitada excede la cantidad de paginas totales");
        }

        const medicos = await this.model
            .find(filtros)
            .skip(skip)
            .limit(limitePorPagina)
            .populate("especialidades") // Traemos todos los datos
            .populate("practicas")
            .populate("sedes");
            // .populate('especialidades', 'nombre duracionTurnoEnMins costoConsulta') // O también podríamos traer selectivamente
            // .populate('practicas', 'nombre codigo costo')
            // .populate('sedes', 'nombre direccion');

        return {
            medicos,
            totalMedicos
        };
    }

    async findById(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestError(`Invalid ID ${id}`);
        }

        const medicoDoc = await MedicoModel.findById(id)
            .populate("especialidades")
            .populate("practicas")
            .populate("sedes");

        if (!medicoDoc) {
            throw new NotFoundError(`Médico con ID ${id} no encontrado`);
        }

        // Retorna el objeto plano para enviarlo como JSON
        return medicoDoc.toObject();
    }

    async updateById(id, atributos) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestError(`Invalid ID ${id}`);
        }

        const medico = await this.model.findByIdAndUpdate(
            id,
            atributos,
            { returnDocument: "after" }
        );

        if (!medico) {
            throw new NotFoundError(`Médico con ID ${id} no encontrado`);
        }

        // Retorna el objeto plano para enviarlo como JSON
        return medico.toObject();
    }
}
