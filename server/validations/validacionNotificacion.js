import { z } from "zod";

export const paginacionNotificacion = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(25).default(10),
}).strict();

export const notificacionesParamsSchema = z.object({
    estado: z.enum(["leidas", "pendientes"])
}).strict();


//para acceder a una notificacion en particular debo validar el id que me pasan como path param
export const notificacionIdParamSchema = z.object({
    id: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, "El formato del ID de notificación no es válido")
}).strict();
