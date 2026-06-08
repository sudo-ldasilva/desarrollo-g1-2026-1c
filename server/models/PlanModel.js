import mongoose from "mongoose";
import { Plan } from "../domain/Plan.js";

const PlanSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    obraSocial: { type: mongoose.Schema.Types.ObjectId, ref: "ObraSocial", required: true },
    coberturasEspecialidad: [{
        especialidad: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Especialidad" 
        },
        nivel: { 
            type: String 
        }
    }],
    coberturasPractica: [{
        practica: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Practica" 
        },
        nivel: { 
            type: String 
        }
    }]
});

PlanSchema.virtual("id").get(function() { return this._id.toString(); });
PlanSchema.set("toJSON", { virtuals: true });
PlanSchema.set("toObject", { virtuals: true });

PlanSchema.loadClass(Plan);
export const PlanModel = mongoose.model("Plan", PlanSchema);