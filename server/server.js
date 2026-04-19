import app from "./app.js";
import dotenv from "dotenv";

const port = process.env.PORT;

//Healthcheck
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

app.listen(port, () => {
    const urlBase = `http://localhost:${port}`;
    console.log(`Servidor conectado en:\t${urlBase}`);
    console.log(`Health check en:\t${urlBase}/health`);
});