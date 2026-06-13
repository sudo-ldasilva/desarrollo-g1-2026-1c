import { ObraSocialRepository } from "../repositories/obraSocialRepository.js";

class ObraSocialController {
    constructor({ obraSocialRepository = new ObraSocialRepository()} = {}) {
        this.obraSocialRepository = obraSocialRepository;
    }

    getAll = async (req, res, next) => {
        try {
            const obrasSociales = await this.obraSocialRepository.findAll();

            const response = obrasSociales.map(o => ({
                nombre: o.nombre,
                _id: o._id
            }));

            return res.json(response);
       
        } catch(error) {
            next(error);
        }
    };

    getPlanesFromObraSocial = async (req, res, next) => {
        try {
            const id = req.params.id;
            const planes = await this.obraSocialRepository.findPlanesById(id);

            return res.json(planes);
            
        } catch(error) {
            next(error);
        }
    };

}

export default ObraSocialController;