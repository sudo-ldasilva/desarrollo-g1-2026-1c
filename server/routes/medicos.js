import express from "express";

import { MedicosController } from "../repositories/medicosController.js";

const medicosRouter = express.Router();
const medicosController = new MedicosController();

medicosRouter.route("/")
    .get( (req, res, next) => medicosController.findAll(req, res, next) );

export default medicosRouter;
