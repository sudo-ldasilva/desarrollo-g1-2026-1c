import mongoose from "mongoose";
import { runSeed } from "./testSeed.js";

const TEST_DB_URI = process.env.TEST_MONGODB_URI || "mongodb://localhost:27017/sweet_medical_test";

export async function startTestDB() {
    try {
        await mongoose.connect(TEST_DB_URI);
        console.log("Conectado a la base de datos de TEST local");
    } catch (error) {
        console.error("Error conectando a la DB de test.", error.message);
        throw error;
    }
}

export async function reloadTestData() {
    // 1. Borrar la base de datos de test
    await mongoose.connection.dropDatabase();
    
    // 2. Volver a cargar los datos frescos para este test
    await runSeed();
}

export async function disconnectTestDB() {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("Desconectado de la base de datos de TEST");
        }
    } catch (error) {
        console.error("Error desconectando MongoDB de test:", error.message);
    }
}
