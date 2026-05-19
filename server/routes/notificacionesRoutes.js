import express from "express";

import { validate } from "../middlewares/validate.js";
import NotificacionesController from "../controllers/notificacionesController.js";
import { paginacionNotificacion, notificacionesParamsSchema, notificacionIdParamSchema } from "../validations/validacionNotificacion.js";

const notificacionesController = new NotificacionesController();
const notificacionesRouter = express.Router();

notificacionesRouter
    .route("/")
    .get(validate(paginacionNotificacion, "query"), notificacionesController.desplegarNotificaciones);

notificacionesRouter
    .route("/:estado")
    .get(
        validate(paginacionNotificacion, "query"),
        validate(notificacionesParamsSchema, "params"),
        notificacionesController.desplegarNotificaciones
    );
    
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
