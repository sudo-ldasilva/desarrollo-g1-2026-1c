import mongoose from "mongoose";

const PacienteSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, // 🔹 ObjectId + ref
    dni: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    obraSocial: { type: String, default: "OSDE" },
    plan: { type: String, default: "Plan 210" }
});

PacienteSchema.virtual("id").get(function() { return this._id.toString(); });
PacienteSchema.set("toJSON", { virtuals: true });
PacienteSchema.set("toObject", { virtuals: true });

export default mongoose.models.Paciente || mongoose.model("Paciente", PacienteSchema);
