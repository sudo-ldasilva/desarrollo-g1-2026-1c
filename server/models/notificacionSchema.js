import mongoose from "mongoose";
import { Notificacion } from "../domain/Notificacion";

export const NotificacionSchema = new mongoose.Schema({
    notificacionId: { type: String, required: true,unique: true },
    destinatario: [{ type: String, ref: "Usuario",required: true}], //planteo los destinatarios como una lista, ya que una misma notificación puede tener muchos destinatarios.
    remitente: { type: String, ref: "Usuario",required: true },
    mensaje: { type: String,required: true },//creo que no es necesario persistir el mensaje en una entidad aparte. El mensaje sólo existe por estar dentro de una notificación.
    fechaHoraCreacion: {type: Date, required: true},
    fechaHoraLeida: {type:Date, required:false},
    leida: {type: Boolean, required:true}
});

NotificacionSchema.loadClass(Notificacion);
export const NotificacionModel = mongoose.model("Notificacion", NotificacionSchema);