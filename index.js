import express from "express";

// Implementación del endpoint "Health check"

const app = express();
app.use(express.json());

const puerto = 3000;

app.get("/health", (req, res) => {
    res.sendStatus(200);
})

app.listen(puerto , () => {
    console.log("Servidor conectado en puerto: " + puerto);
})