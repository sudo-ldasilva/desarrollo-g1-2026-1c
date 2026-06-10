import express from "express";
import { PracticaController } from "../controllers/PracticaController.js";
import { validate } from "../middlewares/validate.js";
import { createPracticaSchema, updatePracticaSchema, practicaQuerySchema } from "../validations/practicaSchema.js";

const practicasRouter = express.Router();
const controller = new PracticaController();

practicasRouter.route("/")
    .get(validate(practicaQuerySchema, "query"), (req, res, next) => controller.findAll(req, res, next))
    .post(validate(createPracticaSchema, "body"), (req, res, next) => controller.createPractica(req, res, next)); // ALTA

practicasRouter.route("/:id")
    .patch(validate(updatePracticaSchema, "body"), (req, res, next) => controller.updatePractica(req, res, next)) // MODIFICACIÓN
    .delete((req, res, next) => controller.deletePractica(req, res, next)); // BAJA

export default practicasRouter;
