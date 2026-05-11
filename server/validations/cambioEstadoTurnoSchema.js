import { z } from "zod";

export const cambioEstadoTurnoSchema = z.object({
    estado: z.enum([
        "RESERVADO",
        "CANCELADO",
        "REALIZADO",
        "PENDIENTE_REPROGRAMACION"
    ]),

    motivo: z.string().optional(),

    fechaHora: z.string().datetime().optional()
});