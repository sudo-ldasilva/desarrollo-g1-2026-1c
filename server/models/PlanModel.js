import mongoose from "mongoose";
import { Plan } from "../domain/Plan.js";

// Sub-esquema para cobertura de especialidad
const CoberturaEspecialidadSchema = new mongoose.Schema({
    especialidad: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Especialidad", 
        required: true 
    },
    nivel: { 
        type: String, 
        enum: ["Total", "Parcial", "No cubierta"], 
        required: true 
    }
}, { _id: false });

// Sub-esquema para cobertura de práctica
const CoberturaPracticaSchema = new mongoose.Schema({
    practica: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Practica", 
        required: true 
    },
    nivel: { 
        type: String, 
        enum: ["Total", "Parcial", "No cubierta"], 
        required: true 
    }
}, { _id: false });

const PlanSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    coberturasEspecialidad: [CoberturaEspecialidadSchema],
    coberturasPractica: [CoberturaPracticaSchema]
});

// Virtual para exponer "id" en JSON
PlanSchema.virtual("id").get(function() { return this._id.toString(); });
PlanSchema.set("toJSON", { virtuals: true });
PlanSchema.set("toObject", { virtuals: true });

// Cargar métodos del dominio si los hubiera
PlanSchema.loadClass(Plan);

export const PlanModel = mongoose.model("Plan", PlanSchema, "planes");
