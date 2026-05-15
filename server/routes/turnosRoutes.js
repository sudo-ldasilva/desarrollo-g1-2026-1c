import express from "express";

import TurnosController from "../controllers/turnosController.js";
import { validate } from "../middlewares/validate.js";
import { cambioEstadoTurnoSchema } from "../validations/cambioEstadoTurnoSchema.js";
import { turnosQuerySchema } from "../validations/turnosQueySchema.js";

const turnosController = new TurnosController();
const turnosRouter = express.Router();

turnosRouter
    .route("/")
    .get(validate(turnosQuerySchema, "query"), turnosController.buscarPaginado);

turnosRouter
    .route("/mis-turnos")
    .get((req, res, next) => turnosController.buscarMisTurnos(req, res, next));

turnosRouter
    .route("/:idTurno/cambios-estado")
    .post(validate(cambioEstadoTurnoSchema, "body"), turnosController.cambiarEstado);

export default turnosRouter;