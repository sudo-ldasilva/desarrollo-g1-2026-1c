import express from "express";

import { MedicoController } from "../../../server/controllers/MedicoController.js";
import { MedicoService } from "../../../server/services/MedicoService.js";

export function buildTestApp(medicoRepository) {
    const medicoService = new MedicoService({medicoRepository});
    const medicoController = new MedicoController({medicoService, medicoRepository});

    const app = express();
    app.use(express.json());


    const router = express.Router();
    router.route("/medicos")
        .get( (req, res, next) => medicoController.findAll(req, res, next) )
        .post((req, res, next) => medicoController.createMedico(req, res, next));
    router.route("/medicos/:id")
        .get( (req, res, next) => medicoController.getMedicoById(req, res, next) )
        .patch( (req, res, next) => medicoController.patchMedicoById(req, res, next) );

    app.use(router);
    return app;
}
