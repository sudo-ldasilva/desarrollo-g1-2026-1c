import express from "express";

import healthRouter from "./health.js";
import turnosRouter from "./turnosRoutes.js";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/turnos", turnosRouter);

export default router;
