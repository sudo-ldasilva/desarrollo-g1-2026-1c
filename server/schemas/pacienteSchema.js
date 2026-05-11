import mongoose from "mongoose";
import {Paciente} from "../domain/Paciente.js";


const PacienteSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    usuarioId: { type: String, ref: "Usuario", required: true },
    dni: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    obraSocial: { type: String, default: "OSDE" },
    plan: { type: String, default: "Plan 210" }
});

PacienteSchema.loadClass(Paciente);
export const PacienteModel = mongoose.model("Paciente", PacienteSchema);