import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";

export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            status: "fail",
            message: "Validation error",
            errors: err.issues.map(issue => ({
                campo: issue.path.join("."),
                mensaje: issue.message
            })),
            timestamp: new Date().toISOString()
        });
    }
    
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        timestamp: new Date().toISOString(),
    });
}