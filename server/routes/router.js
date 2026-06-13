import express from "express";
import healthRouter from "./health.js";
import medicoRouter from "./medicos.js";
import turnosRouter from "./turnosRoutes.js";
import notificacionesRouter from "./notificacionesRoutes.js";
import pacientesRouter from "./pacientesRouter.js";
import obrasSocialesRouter from "./obrasSocialesRouter.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { PacienteModel } from "../models/PacienteModel.js";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/medicos", medicoRouter);
router.use("/turnos", turnosRouter);
router.use("/notificaciones", notificacionesRouter);
router.use("/pacientes", pacientesRouter);
router.use("/obras-sociales", obrasSocialesRouter);

router.get("/me", authMiddleware, async (req, res) => {
    console.log("DEBUG: PREGUNTAN /ME");
    const paciente = await PacienteModel.findOne({
        usuario: req.user._id
    });

    const tienePerfil = !!(paciente && paciente.nombre && paciente.dni);

    res.json({
        usuarioId: req.user._id,
        rol: req.user.rol,
        tienePerfil
    });
});

export default router;
