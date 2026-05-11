import express from "express";

import {TurnosController} from "../controllers/turnosController.js";

const turnosController = new TurnosController();
const turnosRouter = express.Router();

turnosRouter
    .route("/")
    .get((req, res, next) => turnosController.buscar(req, res, next));

turnosRouter
    .route("/mis-turnos")
    .get((req, res, next) => turnosController.buscarMisTurnos(req, res, next));

turnosRouter
    .route("/:idTurno/cambios-estado")
    .post((req, res, next) => turnosController.cambiarEstado(req, res, next));

export default turnosRouter;