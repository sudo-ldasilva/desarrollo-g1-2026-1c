// server/models/SedeModel.js
import mongoose from "mongoose";

const SedeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true }
});

SedeSchema.virtual('id').get(function() { return this._id.toString(); });
SedeSchema.set('toJSON', { virtuals: true });
SedeSchema.set('toObject', { virtuals: true });

export default mongoose.models.Sede || mongoose.model("Sede", SedeSchema);
