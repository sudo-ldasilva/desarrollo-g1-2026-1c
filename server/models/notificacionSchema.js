import mongoose from "mongoose";
import { Notificacion } from "../domain/Notificacion.js";

export const NotificacionSchema = new mongoose.Schema({
    destinatario: { type:mongoose.Schema.Types.ObjectId, ref: "Usuario",required: true}, // Lo cambio como object por que podríamos popular el nombre del usuario.
    remitente: { type:mongoose.Schema.Types.ObjectId, ref: "Usuario",required: true }, 
    mensaje: { type: String,required: true },//creo que no es necesario persistir el mensaje en una entidad aparte. El mensaje sólo existe por estar dentro de una notificación.
    fechaHoraCreacion: {type: Date, required: true},
    fechaHoraLeida: {type:Date, required:false},
    leida: {type: Boolean, required:true}
});

NotificacionSchema.loadClass(Notificacion);
export const NotificacionModel = mongoose.model("Notificacion", NotificacionSchema);