import mongoose from "mongoose";
import { ObraSocial } from "../domain/ObraSocial.js";

const ObraSocialSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    planes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan"}],
});

ObraSocialSchema.virtual("id").get(function() { return this._id.toString(); });
ObraSocialSchema.set("toJSON", { virtuals: true });
ObraSocialSchema.set("toObject", { virtuals: true });

ObraSocialSchema.loadClass(ObraSocial);
export const ObraSocialModel = mongoose.model("ObraSocial", ObraSocialSchema);