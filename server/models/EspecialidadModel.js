import mongoose from "mongoose";
import { Especialidad } from "../domain/Especialidad.js";

export const EspecialidadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    duracionTurnoEnMins: { type: Number, default: 15 },
    costoConsulta: { type: Number, default: 10000 }
});

EspecialidadSchema.virtual("id").get(function() { return this._id.toString(); });
EspecialidadSchema.set("toJSON", { virtuals: true });
EspecialidadSchema.set("toObject", { virtuals: true });

EspecialidadSchema.loadClass(Especialidad);
export const EspecialidadModel = mongoose.model("Especialidad", EspecialidadSchema, "especialidades");
