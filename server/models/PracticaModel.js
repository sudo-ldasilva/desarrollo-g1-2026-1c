import mongoose from "mongoose";
import { Practica } from "../domain/Practica.js";

const PracticaSchema = new mongoose.Schema({
    codigo:              { type: String, required: true, unique: true },
    nombre:              { type: String, required: true },
    duracionTurnoEnMins: { type: Number },
    costo:               { type: Number }
});

PracticaSchema.virtual("id").get(function() { return this._id.toString(); });
PracticaSchema.set("toJSON", { virtuals: true });
PracticaSchema.set("toObject", { virtuals: true });

PracticaSchema.loadClass(Practica);
export const PracticaModel = mongoose.model("Practica", PracticaSchema);
