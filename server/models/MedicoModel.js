import mongoose from "mongoose";
import { Medico } from "../domain/Medico.js";
import { DiaSemana } from "../domain/DiaSemana.js";

const DisponibilidadSchema = new mongoose.Schema(
    {
        diaSemana: {
            type: String,
            enum: Object.values(DiaSemana),
            required: true,
        },
        horaDesde: { type: String, required: true },
        horaHasta: { type: String, required: true },
        sede: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sede",
            required: true,
        },
        servicio: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "tipoServicioDisp",
        },
        tipoServicioDisp: {
            type: String,
           enum: ["Especialidad", "Practica"],
        },
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

// Evita errores por recompilar el modelo en hot-reload
MedicoSchema.loadClass(Medico);
export const MedicoModel = mongoose.model("Medico", MedicoSchema, "medicos");
