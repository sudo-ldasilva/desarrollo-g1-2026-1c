import "./models/index.js";

import app from "./app.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

dotenv.config();
const port = process.env.PORT;

connectDB().then(() => {
    app.listen(port, () => {
        const urlBase = `http://localhost:${port}`;
        console.log(`Servidor conectado en:${urlBase}`);
        console.log(`Health check en:${urlBase}/health`);
        console.log(`Documentacion API REST en: ${urlBase}/api-docs`);
    });
});

// Cierre limpio al presionar Ctrl+C
process.on("SIGINT", async () => {
    console.log("\nRecibida señal de cierre. Desconectando MongoDB...");
    await disconnectDB();
    process.exit(0);
});
