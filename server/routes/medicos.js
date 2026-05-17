import express from "express";

import { MedicoController } from "../controllers/MedicoController.js";

const medicoRouter = express.Router();
const medicoController = new MedicoController();

medicoRouter.route("/")
    .get( (req, res, next) => medicoController.findAll(req, res, next) );

medicoRouter.route("/:id")
    .get( (req, res, next) => medicoController.getMedicoById(req, res, next) )
    .patch( (req, res, next) => medicoController.patchMedicoById(req, res, next) );

export default medicoRouter;
