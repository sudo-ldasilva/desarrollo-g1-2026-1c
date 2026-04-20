import app from "./app.js";
import dotenv from "dotenv";

const port = process.env.PORT;

app.listen(port, () => {
    const urlBase = `http://localhost:${port}`;
    console.log(`Servidor conectado en:\t${urlBase}`);
    console.log(`Health check en:\t${urlBase}/health`);
});
