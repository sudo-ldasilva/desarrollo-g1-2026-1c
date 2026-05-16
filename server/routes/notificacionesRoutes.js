import express from "express";

import { validate } from "../middlewares/validate.js";
import NotificacionesController from "../controllers/notificacionesController.js";
import { validarNotificacion } from "../validations/validacionNotificacion.js";

const notificacionesController = new NotificacionesController();
const notificacionesRouter = express.Router();

notificacionesRouter
    .route("/")
    .get(validate(validarNotificacion, "notificacion"), notificacionesController.desplegarNotificaciones);

export default notificacionesRouter;
