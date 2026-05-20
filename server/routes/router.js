import express from "express";

import healthRouter from "./health.js";
import turnosRouter from "./turnosRoutes.js";
import notificacionesRouter from "./notificacionesRoutes.js";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/turnos", turnosRouter);
router.use("/notificaciones", notificacionesRouter);
export default router;
