import express from "express";
import PracticasController from "../controllers/practicasController.js";

const router = express.Router();
const controller = new PracticasController();

router.get("/", (req, res, next) => controller.getAll(req, res, next));

export default router;
