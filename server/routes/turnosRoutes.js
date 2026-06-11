import express from "express";

import TurnosController from "../controllers/turnosController.js";
import { validate } from "../middlewares/validate.js";
import { cambioEstadoTurnoSchema } from "../validations/cambioEstadoTurnoSchema.js";
import { turnosQuerySchema } from "../validations/turnosQueySchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const turnosController = new TurnosController();
const turnosRouter = express.Router();

turnosRouter
    .route("/")
    .get(validate(turnosQuerySchema, "query"), turnosController.buscarPaginado);

turnosRouter
    .route("/mis-turnos")
    .get(
        validate(turnosQuerySchema, "query"), 
        authMiddleware,
        (req, res, next) => turnosController.buscarMisTurnos(req, res, next)
    );

turnosRouter
    .route("/:idTurno/cambios-estado")
    .post(validate(cambioEstadoTurnoSchema, "body"), turnosController.cambiarEstado);

// Tambien podria ir en pacientesRoutes. Pero como el pacienteId actua
// como filtro/contexto, y no como recurso principal, lo dejo aca.
turnosRouter
    .route("/pacientes/:pacienteId/historial")
    .get(validate(turnosQuerySchema, "query"), turnosController.buscarHistorialPaciente);

export default turnosRouter;
