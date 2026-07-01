import express from "express";
import BatchTurnosService from "../services/batchTurnosService.js";
import { MedicoController } from "../controllers/MedicoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { agregarDisponibilidadSchema } from "../validations/agregarDisponibilidadSchema.js";

const medicoRouter = express.Router();
const medicoController = new MedicoController();

medicoRouter.route("/")
    .get( (req, res, next) => medicoController.findAll(req, res, next) )
    .post((req, res, next) => medicoController.createMedico(req, res, next));

medicoRouter.route("/:id")
    .get(authMiddleware, (req, res, next) => medicoController.getMedicoById(req, res, next) )
    .patch(authMiddleware, (req, res, next) => medicoController.patchMedicoById(req, res, next) );

medicoRouter.post("/batch-generar", async (req, res, next) => {
    try {
        const service = new BatchTurnosService();
        const rta = await service.ejecutar();
        res.json({ status: "success", data: rta });
    } catch (e) { next(e); }
});

medicoRouter.route("/:id/disponibilidades")
    .post(authMiddleware, validate(agregarDisponibilidadSchema, "body"), (req, res, next) => medicoController.agregarDisponibilidad(req, res, next));

medicoRouter.route("/:id/disponibilidades/:idDisp")
    .delete(authMiddleware, (req, res, next) => medicoController.eliminarDisponibilidad(req, res, next));

export default medicoRouter;
