import { z } from "zod";

export const turnosQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(25).default(10),
    medico: z.string().optional(),
    sede: z.string().optional(),
    practica: z.string().optional(),
    especialidad: z.string().optional(),
    fechaInicio: z.coerce.date().optional(),
    fechaFin: z.coerce.date().optional()
}).strict();