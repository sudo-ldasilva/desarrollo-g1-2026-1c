import { MedicosRepository } from "../repositories/medicosRepository.js";

export class MedicosService {
    constructor({ medicosRepository = new MedicosRepository() } = {}) {
        this.medicosRepository = medicosRepository;
    }
}
