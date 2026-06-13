import { z } from "zod";

export const crearPacienteRequest = z.object({
    nombre: z.string()
        .min(2, "El nombre debe tener al menos 2 caracteres.")
        .max(100, "El nombre es demasiado largo."),
    dni: z.string().regex(/^\d{7,8}$/)
        .regex(/^\d{7,8}$/, "El DNI debe contener entre 7 y 8 dígitos numéricos, sin puntos ni guiones."),
    obraSocial: z.string(),
    plan: z.string()
}).strict();

