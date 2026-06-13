import { z } from "zod";

export const crearPacienteRequest = z.object({
    nombre: z.string(),
    dni: z.string().regex(/^\d{7,8}$/),
    obraSocial: z.string(),
    plan: z.string()
}).strict();

