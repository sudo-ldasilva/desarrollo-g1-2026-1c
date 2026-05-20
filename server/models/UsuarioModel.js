import mongoose from "mongoose";
import { Usuario } from "../domain/Usuario.js";

const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    password:      { type: String, required: true }
});

UsuarioSchema.virtual("id").get(function() { return this._id.toString(); });
UsuarioSchema.set("toJSON", { virtuals: true });
UsuarioSchema.set("toObject", { virtuals: true });

UsuarioSchema.loadClass(Usuario);
export const UsuarioModel = mongoose.model("Usuario", UsuarioSchema);
