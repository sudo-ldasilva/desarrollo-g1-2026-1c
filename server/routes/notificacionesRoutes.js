import express from "express";

import { validate } from "../middlewares/validate.js";
import NotificacionesController from "../controllers/notificacionesController.js";
import { notificacionesQuerySchema, notificacionIdParamSchema } from "../validations/validacionNotificacion.js";

const notificacionesController = new NotificacionesController();
const notificacionesRouter = express.Router();

notificacionesRouter
    .route("/")
    .get(validate(notificacionesQuerySchema, "query"),
        (req, res, next) => notificacionesController.desplegarNotificaciones(req, res, next));

    
notificacionesRouter
    .route("/:id")
    .get(
        validate(notificacionIdParamSchema, "params"), 
        notificacionesController.obtenerPorId
    )

    .patch(
        validate(notificacionIdParamSchema, "params"), 
        notificacionesController.marcarComoLeida
    );


export default notificacionesRouter;
