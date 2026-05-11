import mongoose from "mongoose";
import { Turno } from "../domain/Turno.js";

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
    practica: { type:mongoose.Schema.Types.ObjectId, required: true},
    especialidad: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Especialidad",
    },
    estado: {
        type: String, 
        enum: [ "DISPONIBLE", "RESERVADO", "CONFIRMADO", "CANCELADO", "REALIZADO"], 
        default: "Disponible"
    },
    historialEstados: [{
        
    }],
    costo: {type: Number}    
});

//Middleware que nos permite popular dentro del turno
TurnoSchema.pre(/^find/, function(next) {
    this.populate("Medico", "nombre matricula");
    this.populate("Sede", "nombre direccion");
    this.populate("Especialidad", "nombre duracionTurnoEnMins costoConsulta");
    next();
});

TurnoSchema.loadClass(Turno);
export const TurnoModel = mongoose.model("Turno", TurnoSchema);