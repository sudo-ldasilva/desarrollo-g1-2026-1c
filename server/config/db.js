// server/config/db.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import path from "path";
import { promises as fs } from "fs"; //para el config de mongodb-memory-server

let mongoServer = null;

export const connectDB = async () => {

    try {

        if (process.env.NODE_ENV === "test") {

            mongoServer = await MongoMemoryServer.create();

            const uri = mongoServer.getUri();

            await mongoose.connect(uri);

            console.log("MongoMemoryServer connected");

        } else {

            const uri =
                `${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`;

            const conn = await mongoose.connect(uri);

            console.log(
                `MongoDB connected: ${conn.connection.host}`
            );
        }

    } catch (error) {

        console.error(
            "Error connecting to MongoDB:",
            error.message
        );

        process.exit(1);
    }
};

export const disconnectDB = async () => {

    try {

        if (mongoose.connection.readyState !== 0) {

            await mongoose.disconnect();

            console.log("MongoDB disconnected");
        }

        if (mongoServer) {

            await mongoServer.stop();

            console.log("MongoMemoryServer stopped");
        }

    } catch (error) {

        console.error(
            "Error disconnecting MongoDB:",
            error.message
        );
    }
};

//TODO console.error() --> logger tipo Pino/Winston/Morgan
