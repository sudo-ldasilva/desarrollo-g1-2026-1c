import mongoose from "mongoose";
import Turno from "../domain/Turno.js";

const TurnoSchema = new mongoose.Schema({
    fechaHora:{ type: Date },
    medico: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Medico",
        required: true
    },
    
    paciente: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Paciente"
    },

    sede: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Sede",
        required: true
    },

    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "tipoServicio"
    },

    tipoServicio: {
        type: String,
        required: true,
        enum: ["Practica", "Especialidad"]
    },

    estado: {
        type: String, 
        enum: [ "DISPONIBLE", "RESERVADO", "CONFIRMADO", "CANCELADO", "REALIZADO", "PENDIENTE_REPROGRAMACION"], 
        default: "DISPONIBLE"
    },

    historialEstados: [{
        fechaIngreso: { type: Date, default: Date.now },
        estado: { type: String },
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
        motivo: { type: String }
    }],

    costo: {type: Number}    
});

TurnoSchema.loadClass(Turno);
export const TurnoModel = mongoose.model("Turno", TurnoSchema);