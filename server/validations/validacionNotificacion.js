import { z } from "zod";

export const paginacionNotificacion = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(25).default(10),
}).strict();

export const notificacionesParamsSchema = z.object({
    estado: z.enum(["leidas", "pendientes"])
}).strict();