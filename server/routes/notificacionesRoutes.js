import express from "express";

import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import NotificacionesController from "../controllers/notificacionesController.js";
import { notificacionesQuerySchema, notificacionIdParamSchema } from "../validations/validacionNotificacion.js";

const notificacionesController = new NotificacionesController();
const notificacionesRouter = express.Router();

notificacionesRouter
    .route("/")
    .get(
        validate(notificacionesQuerySchema, "query"),
        authMiddleware,
        (req, res, next) => notificacionesController.desplegarNotificaciones(req, res, next));

    
notificacionesRouter
    .route("/:id")
    .get(
        validate(notificacionIdParamSchema, "params"), 
        authMiddleware,
        notificacionesController.obtenerPorId
    )

    .patch(
        validate(notificacionIdParamSchema, "params"), 
        authMiddleware,
        notificacionesController.marcarComoLeida
    );


export default notificacionesRouter;
