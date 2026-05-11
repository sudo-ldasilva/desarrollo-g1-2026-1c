import mongoose from "mongoose";
import { Practica } from "../domain/Practica.js";

export const PracticaSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    codigo: {type: String, required: true},
    nombre: { type: String, required: true },
    duracionTurnoEnMins: { type: Number, default: 15 },
    costoConsulta: { type: Number, default: 10000 }
});

PracticaSchema.loadClass(Practica);
export const PracticaModel = mongoose.model("Practica", PracticaSchema);