// server/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const MONGO_DB_NAME = process.env.MONGODB_DB_NAME || "sweet_medical";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}/${MONGO_DB_NAME}`);
    console.log(`MongoDB conectado con:\t${MONGO_DB_NAME}`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("MongoDB desconectado");
};
