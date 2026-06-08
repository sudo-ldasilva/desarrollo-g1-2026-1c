import mongoose from "mongoose";
import { Practica } from "../domain/Practica.js";

const PracticaSchema = new mongoose.Schema({
    codigo:              { type: String, required: true, unique: true },
    nombre:              { type: String, required: true },
    duracionTurnoEnMins: { type: Number },
    costo:               { type: Number }
});

PracticaSchema.loadClass(Practica);
export const PracticaModel = mongoose.model("Practica", PracticaSchema, "practicas");
