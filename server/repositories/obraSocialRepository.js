import {ObraSocialModel} from "../models/ObraSocialModel.js";

export class ObraSocialRepository {
    constructor() {
        this.model = ObraSocialModel;
    }

    findAll = async () => {
        return await this.model.find();
    };

    findPlanesById = async (id) => {
        const response = await this.model
            .findById(id)
            .populate("planes" , "nombre");

        return response.planes;
    };
}