import mongoose from "mongoose";

const EspecialidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  duracionTurnoEnMins: { type: Number, default: 15 },
  costoConsulta: { type: Number, default: 10000 }
});

// 🔹 Virtual para exponer 'id' en JSON (compatibilidad con dominio)
EspecialidadSchema.virtual('id').get(function() { return this._id.toString(); });
EspecialidadSchema.set('toJSON', { virtuals: true });
EspecialidadSchema.set('toObject', { virtuals: true });

export default mongoose.models.Especialidad || mongoose.model("Especialidad", EspecialidadSchema);
