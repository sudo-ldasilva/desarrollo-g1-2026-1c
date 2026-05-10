import express from "express";

import { MedicosController } from "../controllers/medicosController.js";

const medicosRouter = express.Router();
const medicosController = new MedicosController();

medicosRouter.route("/")
    .get( (req, res, next) => medicosController.findAll(req, res, next) );

export default medicosRouter;
