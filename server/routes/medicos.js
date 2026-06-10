import express from "express";
import BatchTurnosService from "../services/batchTurnosService.js";
import { MedicoController } from "../controllers/MedicoController.js";

const medicoRouter = express.Router();
const medicoController = new MedicoController();

medicoRouter.route("/")
    .get( (req, res, next) => medicoController.findAll(req, res, next) )
    .post((req, res, next) => medicoController.createMedico(req, res, next));

medicoRouter.route("/:id")
    .get( (req, res, next) => medicoController.getMedicoById(req, res, next) )
    .patch( (req, res, next) => medicoController.patchMedicoById(req, res, next) );

medicoRouter.post("/batch-generar", async (req, res, next) => {
    try {
        const service = new BatchTurnosService();
        const rta = await service.ejecutar();
        res.json({ status: "success", data: rta });
    } catch (e) { next(e); }
});

export default medicoRouter;
