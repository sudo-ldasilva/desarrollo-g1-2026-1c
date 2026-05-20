import { z } from "zod";

export const cambioEstadoTurnoSchema = z.object({
    estado: z.enum([
        "RESERVADO",
        "CANCELADO",
        "REALIZADO",
        "PENDIENTE_REPROGRAMACION"
    ]),

    usuarioId: z.string().min(1, "El usuarioId es requerido"),

    motivo: z.string().optional(),

    fechaHora: z.string().datetime().optional()
}).refine(data => {
    // el motivo es obligatorio para cancelar 
    if (data.estado === "CANCELADO" && !data.motivo) {
        return false;
    }
    return true;
}, {
    message: "Debe indicar un motivo para la cancelación",
    path: ["motivo"]
}).refine(data => {
    // la fecha es obligatorio para reprogramar 
    if (data.estado === "PENDIENTE_REPROGRAMACION" && !data.fechaHora) {
        return false;
    }
    return true;
}, {
    message: "Debe indicar fechaHora para la reprogramacion",
    path: ["motivo"]
});