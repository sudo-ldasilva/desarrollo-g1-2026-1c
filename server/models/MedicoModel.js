import mongoose from "mongoose";

const MedicoSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true }, 
	usuario: { type: String, required: true },
	matricula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true },
	// TODO join con Especialidad
	especialidades: [{ type: String }]
});

// Evita errores por recompilar el modelo en hot-reload
export default mongoose.models.Medico || mongoose.model("Medico", MedicoSchema);
