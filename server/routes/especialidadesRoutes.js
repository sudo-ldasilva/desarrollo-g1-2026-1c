import express from "express";
import { EspecialidadController } from "../controllers/EspecialidadController.js";
import { validate } from "../middlewares/validate.js";
import { createEspecialidadSchema, updateEspecialidadSchema, especialidadQuerySchema } from "../validations/especialidadSchema.js";

const especialidadRouter = express.Router();
const controller = new EspecialidadController();

especialidadRouter.route("/")
    .get(validate(especialidadQuerySchema, "query"), (req, res, next) => controller.findAll(req, res, next))
    .post(validate(createEspecialidadSchema, "body"), (req, res, next) => controller.createEspecialidad(req, res, next)); // ALTA

especialidadRouter.route("/:id")
    .patch(validate(updateEspecialidadSchema, "body"), (req, res, next) => controller.updateEspecialidad(req, res, next)) // MODIFICACIÓN
    .delete((req, res, next) => controller.deleteEspecialidad(req, res, next)); // BAJA

export default especialidadRouter;