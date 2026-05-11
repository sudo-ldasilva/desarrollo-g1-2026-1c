import express from "express";
import healthRouter from "./health.js";
import medicoRouter from "./medicos.js";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/medicos", medicoRouter);

export default router;
