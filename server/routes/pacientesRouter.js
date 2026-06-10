import express from "express";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { PacientesController } from "../controllers/pacientesController.js";
import {crearPacienteRequest} from "../validations/crearPacienteRequest.js";


const pacientesController = new PacientesController();
const pacientesRouter = express.Router();

pacientesRouter
    .route("")
    .post(
        authMiddleware,
        validate(crearPacienteRequest, "body"), 
        pacientesController.crear
    );


export default pacientesRouter;