import {TurnoModel} from "../schemas/turnoSchema.js";


class TurnosRepository {
    constructor() {
        this.model = TurnoModel;
    } 

    async buscarPaginado(page, limit) {
        //cuantos documentos hay que saltar
        const skip = (page - 1) * limit;

        const turnos =
            await this.model
                .find() 
                .skip(skip)
                .limit(limit);

        const total =
            await this.model.countDocuments();

        return {
            turnos,
            total,
            page,
            // por ejemplo para 23 con x por pagina -> 4.6 necesito 5 paginas la ultima no completa
            totalPages: Math.ceil(total / limit)
        };
    }
}