import mongoose from "mongoose";
import { Paciente } from "../domain/Paciente.js";

const PacienteSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    dni: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    obraSocial: { type: mongoose.Schema.Types.ObjectId, ref: "ObraSocial" },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" }
});

PacienteSchema.loadClass(Paciente);
export const PacienteModel = mongoose.model("Paciente", PacienteSchema, "pacientes");
