import mongoose from "mongoose";
import { Usuario } from "../domain/Usuario.js";

const UsuarioSchema = new mongoose.Schema({
    logtoId: {type:String, unique: true},
    rol: {type:String, enum:["PACIENTE", "MEDICO"]}
});

UsuarioSchema.loadClass(Usuario);
export const UsuarioModel = mongoose.model("Usuario", UsuarioSchema, "usuarios");
