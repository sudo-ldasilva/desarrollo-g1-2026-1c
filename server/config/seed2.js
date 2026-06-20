import {MedicoModel} from "../models/MedicoModel.js";
import {UsuarioModel} from "../models/UsuarioModel.js";
import { EspecialidadModel } from "../models/EspecialidadModel.js";
import { SedeModel } from "../models/SedeModel.js";

import dotenv from "dotenv";
dotenv.config();

export const runSeed = async() => {
    try {
        console.log("🌱 Iniciando Seed Determinista...");

        const usuarioMedico = await UsuarioModel.create({
            nombreUsuario: "Peperon",
            logtoId:"dkbgngkriks7",
            rol: "MEDICO"
        });

        const clinica = await EspecialidadModel.create({
            nombre: "Clinica",
            duracionTurnoEnMins: 25,
            costo: 10000
        });

        const camilo = await SedeModel.create({
            nombre: "Clinica San Camilo",
            direccion: "Gascón 450, C1181ACH CABA"
        });

        await MedicoModel.create({
            usuario: usuarioMedico._id, 
            matricula: "MP-1091",
            nombre: "Dr. Juan Pérez",
            especialidades: [clinica._id], 
            sedes: [camilo._id]
        });

        console.log("🎉 Seed completado exitosamente.");
    } catch(error) {
        console.error("❌ Error durante el seed:", error);
        throw error;
    }
};

// Ejecutar si se llama directamente desde consola
if (process.argv[1] && process.argv[1].includes("seed2.js")) {
    import("./db.js").then(async ({ connectDB, disconnectDB }) => {
        await connectDB();
        await runSeed();
        await disconnectDB();
        process.exit(0);
    });
}
