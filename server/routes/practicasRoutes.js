import express from "express";
import { PracticaController } from "../controllers/PracticaController.js";

const practicasRouter = express.Router();
const controller = new PracticaController();

practicasRouter.route("/")
    .get((req, res, next) => controller.findAll(req, res, next))
    .post((req, res, next) => controller.createPractica(req, res, next)); // ALTA

practicasRouter.route("/:id")
    .patch((req, res, next) => controller.updatePractica(req, res, next)) // MODIFICACIÓN
    .delete((req, res, next) => controller.deletePractica(req, res, next)); // BAJA

export default practicasRouter;
