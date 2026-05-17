import { z } from "zod";

export const validarNotificacion = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(25).default(10),
    //TODO validar query params para filtrar leidas / no leidas
}).strict();