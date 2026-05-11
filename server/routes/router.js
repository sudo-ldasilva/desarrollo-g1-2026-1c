import express from "express";
import healthRouter from "./health.js";
import medicosRouter from "./medicos.js";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/medicos", medicosRouter);

export default router;
