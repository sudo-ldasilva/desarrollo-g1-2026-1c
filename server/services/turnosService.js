import TurnosRepository from "../repositories/turnosRepository.js";

export class TurnosService{
    constructor() {
        this.turnosRepository = TurnosRepository;
    }

    async buscarPaginado(page, limit) {
        return await this.turnosRepository.buscarPaginado(page,limit);
    }
}