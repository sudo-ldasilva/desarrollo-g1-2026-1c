import { MedicosService } from "../repositories/medicosService.js";

export class MedicosController {
    constructor({ medicosService = new MedicosService() } = {}) {
        this.medicosService = medicosService;
    }
}
