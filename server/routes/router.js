import express from "express";
import healthRouter from "./health.js";
import medicoRouter from "./medicos.js";
import turnosRouter from "./turnosRoutes.js";
import notificacionesRouter from "./notificacionesRoutes.js";
import pacientesRouter from "./pacientesRouter.js";
import obrasSocialesRouter from "./obrasSocialesRouter.js";
import especialidadesRouter from "./especialidadesRoutes.js";
import practicasRouter from "./practicasRoutes.js";
import sedesRouter from "./sedesRoutes.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { PacienteModel } from "../models/PacienteModel.js";
import { MedicoModel } from "../models/MedicoModel.js";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/medicos", medicoRouter);
router.use("/turnos", turnosRouter);
router.use("/notificaciones", notificacionesRouter);
router.use("/pacientes", pacientesRouter);
router.use("/obras-sociales", obrasSocialesRouter);
router.use("/especialidades", especialidadesRouter);
router.use("/practicas", practicasRouter);
router.use("/sedes", sedesRouter);

router.get("/me", authMiddleware, async (req, res) => {
    console.log("DEBUG: PREGUNTAN /ME");

    let tienePerfil = false;
    
    if(req.user.rol === "PACIENTE") {
        const paciente = await PacienteModel.findOne({
            usuario: req.user._id
        });

        tienePerfil = !!(paciente && paciente.nombre && paciente.dni);
    
    } else if(req.user.rol === "MEDICO") {
        const medico = await MedicoModel.findOne({
            usuario: req.user._id
        });

        tienePerfil = !!(medico && medico.nombre && medico.matricula);
    }

    res.json({
        usuarioId: req.user._id,
        rol: req.user.rol,
        tienePerfil
    });
});

export default router;
