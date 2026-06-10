import mongoose from "mongoose";
import { ObraSocial } from "../domain/ObraSocial.js";

const ObraSocialSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    planes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan"}],
});


ObraSocialSchema.loadClass(ObraSocial);
export const ObraSocialModel = mongoose.model("ObraSocial", ObraSocialSchema);