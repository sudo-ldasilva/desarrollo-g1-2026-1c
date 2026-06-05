import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import path from "path";
import { promises as fs } from "fs"; //para el config de mongodb-memory-server
import { runSeed } from "./testSeed.js";

let mongoServer = null;

export async function startTestDB() {
    const dataDir = path.resolve("./.mongo-data-tests");
    await fs.mkdir(dataDir, { recursive: true });

    mongoServer = await MongoMemoryServer.create({
        instance: {
            port: 27010,
            dbPath: dataDir
        }
    });

    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
}

export async function reloadTestData() {
    await mongoose.connection.dropDatabase();
    await runSeed();
}

export const disconnectTestDB = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        await mongoServer.stop();
    } catch (error) {
        console.error(
            "Error disconnecting MongoDB:",
            error.message
        );
    }
};
