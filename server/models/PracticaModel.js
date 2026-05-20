import mongoose from "mongoose";

const PracticaSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    duracionTurnoEnMins: { type: Number, default: 15 },
    costo: { type: Number, default: 5000 }
});

PracticaSchema.virtual("id").get(function() { return this._id.toString(); });
PracticaSchema.set("toJSON", { virtuals: true });
PracticaSchema.set("toObject", { virtuals: true });

export default mongoose.models.Practica || mongoose.model("Practica", PracticaSchema);
