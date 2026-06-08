import mongoose from "mongoose";
import { Paciente } from "../domain/Paciente.js";

const PacienteSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    dni: { type: Number, unique: true },
    nombre: { type: String },
    obraSocial: { type: String },
    plan: { type: String }
});

PacienteSchema.loadClass(Paciente);
export const PacienteModel = mongoose.model("Paciente", PacienteSchema, "pacientes");
