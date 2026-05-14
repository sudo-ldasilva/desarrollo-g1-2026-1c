import mongoose from "mongoose";
import { Sede } from "../domain/Sede.js";

const SedeSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true }
});

SedeSchema.loadClass(Sede);
export const SedeModel = mongoose.model("Sede", SedeSchema);