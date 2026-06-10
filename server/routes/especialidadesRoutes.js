import express from "express";
import { EspecialidadController } from "../controllers/EspecialidadController.js";

const especialidadRouter = express.Router();
const controller = new EspecialidadController();

especialidadRouter.route("/")
    .get((req, res, next) => controller.findAll(req, res, next))
    .post((req, res, next) => controller.createEspecialidad(req, res, next)); // ALTA

especialidadRouter.route("/:id")
    .patch((req, res, next) => controller.updateEspecialidad(req, res, next)) // MODIFICACIÓN
    .delete((req, res, next) => controller.deleteEspecialidad(req, res, next)); // BAJA

export default especialidadRouter;