import mongoose from "mongoose";
import Medico from "../domain/Medico.js";

export const MedicoSchema = new mongoose.Schema({
    usuarioId: { type:mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    matricula: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    especialidades: [{ type: String, ref: "Especialidad" }]
});

MedicoSchema.loadClass(Medico);
export const MedicoModel = mongoose.model("Medico", MedicoSchema);