import express from "express";

// Implementación del endpoint "Health check"

const app = express();
app.use(express.json());

const puerto = 3000;

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

app.listen(puerto, () => {
    const urlBase = `http://localhost:${puerto}`;
    console.log(`Servidor conectado en:\t${urlBase}`);
    console.log(`Health check en:\t${urlBase}/health`);
});


