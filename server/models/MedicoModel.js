import mongoose from "mongoose";

const MedicoSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    matricula: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    // TODO join con Especialidad
    especialidades:    [{ type: String }],
    // TODO join con Practicas
    practicas:         [{ type: String }],
    // TODO join con Sedes
    sedes:             [{ type: String }],
    // TODO join con Disponibilidades
    disponibilidades: [{ type: String }]
});

// Evita errores por recompilar el modelo en hot-reload
export default mongoose.models.Medico || mongoose.model("Medico", MedicoSchema);
