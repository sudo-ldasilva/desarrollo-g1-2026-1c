import express from "express";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import router from "./routes/router.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorLogger } from "./middlewares/errorLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Sweet Medical",
            version: "1.0.0",
            description: "API para gestion de turnos medicos",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: "Servidor de desarrollo",
            },
        ],
    },
    apis: ["./server/routes/*.js", "./server/controllers/*.js"], // Rutas donde documentás
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

export default app;
