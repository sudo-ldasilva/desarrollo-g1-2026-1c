import express from "express";
import ObraSocialController from "../controllers/ObraSocialController.js";


const obraSocialController = new ObraSocialController();
const obrasSocialesRouter = express.Router();

obrasSocialesRouter
    .route("/")
    .get(obraSocialController.getAll);

obrasSocialesRouter
    .route("/:id/planes")
    .get(obraSocialController.getPlanesFromObraSocial);


export default obrasSocialesRouter;