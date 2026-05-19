import MedicoModel from "../models/MedicoModel.js";
import { NotFoundError } from "../errors/AppError.js";

export class MedicoRepository {
    constructor() {
        this.model = MedicoModel;
    }

    async obtenerPaginados(numeroPagina, limitePorPagina, filtros = {}) {
        //cuantos documentos hay que saltar
        const skip = (numeroPagina - 1) * limitePorPagina;

        const medicos = await this.model.find().skip(skip).limit(limitePorPagina)
            .populate('especialidades', 'nombre duracionTurnoEnMins costoConsulta') // Traemos selectivamente
            .populate('practicas', 'nombre codigo costo')
            .populate('sedes', 'nombre direccion');

        const total = await this.model.countDocuments({});

        return {
            medicos,
            total
        };
    }

    async findById(id) {
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
