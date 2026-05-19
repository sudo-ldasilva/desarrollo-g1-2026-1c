// server/models/UsuarioModel.js
import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UsuarioSchema.virtual('id').get(function() { return this._id.toString(); });
UsuarioSchema.set('toJSON', { virtuals: true });
UsuarioSchema.set('toObject', { virtuals: true });

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);
