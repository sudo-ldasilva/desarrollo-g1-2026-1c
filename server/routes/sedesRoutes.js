import express from "express";
import SedesController from "../controllers/sedesController.js";

const router = express.Router();
const controller = new SedesController();

router.get("/", (req, res, next) => controller.getAll(req, res, next));

export default router;
