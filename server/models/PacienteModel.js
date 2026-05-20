import mongoose from "mongoose";
import { Paciente } from "../domain/Paciente.js";

const PacienteSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    dni: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    obraSocial: { type: String },
    plan: { type: String }
});

PacienteSchema.virtual("id").get(function() { return this._id.toString(); });
PacienteSchema.set("toJSON", { virtuals: true });
PacienteSchema.set("toObject", { virtuals: true });

PacienteSchema.loadClass(Paciente);
export const PacienteModel = mongoose.model("Paciente", PacienteSchema);
