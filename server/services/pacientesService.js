import PacientesRepository from "../repositories/pacientesRepository.js";

export default class pacientesService{
    constructor(){
        this.PacientesRepository = new PacientesRepository();
    }

    async obtenerPacientePorId(id) {
        const paciente = await this.PacientesRepository.findById(id);
        
        return paciente;
    }

}