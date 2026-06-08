import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {createRequire} from "module";

import router from "./routes/router.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorLogger } from "./middlewares/errorLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const require = createRequire(import.meta.url);
const swaggerSpec = require("./docs/openapi.json");

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

export default app;
