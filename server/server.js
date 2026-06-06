import "./models/index.js";

import app from "./app.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

import "./models/UsuarioModel.js";
import "./models/EspecialidadModel.js";
import "./models/SedeModel.js";
import "./models/PacienteModel.js";
import "./models/MedicoModel.js";
import "./models/PracticaModel.js";
// import "./DisponibilidadHorariaModel.js"; se descomenta cuando esten andando

dotenv.config();

// Si process.env.PORT no viene (por si falla algo más), le dejamos el 3000 por defecto para que no explote
const port = process.env.PORT;

connectDB().then(() => {
    app.listen(port, () => {
        const urlBase = `http://localhost:${port}`;
        console.log(`Servidor conectado en: \t${urlBase}`);
        console.log(`Health check en: \t${urlBase}/health`);
        console.log(`Documentacion API REST en: \t${urlBase}/api-docs`);
    });
});

// Cierre limpio al presionar Ctrl+C
process.on("SIGINT", async () => {
    console.log("\nRecibida señal de cierre. Desconectando MongoDB...");
    await disconnectDB();
    process.exit(0);
});
