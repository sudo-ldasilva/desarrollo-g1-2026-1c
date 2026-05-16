import app from "./app.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

dotenv.config();
const port = process.env.PORT;

connectDB().then(() => {
    app.listen(port, () => {
        const urlBase = `http://localhost:${port}`;
        console.log(`Servidor conectado en:\t${urlBase}`);
        console.log(`Health check en:\t${urlBase}/health`);
    });
});

// Cierre limpio al presionar Ctrl+C
process.on("SIGINT", async () => {
    console.log("\nRecibida señal de cierre. Desconectando MongoDB...");
    await disconnectDB();
    process.exit(0);
});
