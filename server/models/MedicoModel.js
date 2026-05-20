import mongoose from "mongoose";
import { Medico } from "../domain/Medico.js";
import { DiaSemana } from "../domain/DiaSemana.js";

const DisponibilidadSchema = new mongoose.Schema(
    {
        horaInicio: { type: String, required: true },
        horaFin: { type: String, required: true },
        diasSemana: [
            {
                type: String,
                enum: Object.values(DiaSemana),
                required: true,
            },
        ],
    },
    { _id: false }
);

const MedicoSchema = new mongoose.Schema({
    usuario:           { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    matricula:         { type: String, required: true, unique: true },
    nombre:            { type: String, required: true },
    especialidades:    [{ type: mongoose.Schema.Types.ObjectId, ref: "Especialidad" }],
    practicas:         [{ type: mongoose.Schema.Types.ObjectId, ref: "Practica" }],
    sedes:             [{ type: mongoose.Schema.Types.ObjectId, ref: "Sede" }],
    disponibilidades:  [DisponibilidadSchema],
});

// Virtual para exponer "id" en JSON (compatibilidad con dominio)
MedicoSchema.virtual("id").get(function() { return this._id.toString(); });
MedicoSchema.set("toJSON", { virtuals: true });
MedicoSchema.set("toObject", { virtuals: true });

// Evita errores por recompilar el modelo en hot-reload
MedicoSchema.loadClass(Medico);
export const MedicoModel = mongoose.model("Medico", MedicoSchema);
