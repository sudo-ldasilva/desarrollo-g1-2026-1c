import mongoose from "mongoose";

const MedicoSchema = new mongoose.Schema({
    usuario:           { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    matricula:         { type: String, required: true, unique: true },
    nombre:            { type: String, required: true },
    especialidades:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad' }],
    practicas:         [{ type: mongoose.Schema.Types.ObjectId, ref: 'Practica' }],
    sedes:             [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sede' }],
    // TODO join con Disponibilidades
	//disponibilidades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DisponibilidadHoraria' }]
    disponibilidades:  [{ type: String }]
});

// Virtual para exponer 'id' en JSON (compatibilidad con dominio)
MedicoSchema.virtual('id').get(function() { return this._id.toString(); });
MedicoSchema.set('toJSON', { virtuals: true });
MedicoSchema.set('toObject', { virtuals: true });

// Evita errores por recompilar el modelo en hot-reload
export default mongoose.models.Medico || mongoose.model("Medico", MedicoSchema);
