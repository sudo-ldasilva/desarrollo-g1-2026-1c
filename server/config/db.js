// server/config/db.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import path from "path";
import { promises as fs } from "fs"; //para el config de mongodb-memory-server

let mongoServer;

export const connectDB = async () => {
    try {
        // Modo desarrollo: MongoDB embebido con persistencia en disco
        const dataDir = path.resolve("./.mongo-data");
        await fs.mkdir(dataDir, { recursive: true });

        mongoServer = await MongoMemoryServer.create({
            instance: {
                dbPath: dataDir
            }
        });

        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log(`MongoDB local persistente iniciado ${uri}`);
        console.log(`Datos guardados en: ${dataDir}`);

    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1); // Detiene el servidor si falla la conexión
    }
};

// Función para cerrar la conexión limpiamente
export const disconnectDB = async () => {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
};

//TODO console.error() --> logger tipo Pino/Winston/Morgan
