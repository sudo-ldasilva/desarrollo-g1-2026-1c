import express from "express";
import EspecialidadesController from "../controllers/especialidadesController.js";

const router = express.Router();
const controller = new EspecialidadesController();

router.get("/", (req, res, next) => controller.getAll(req, res, next));

export default router;
