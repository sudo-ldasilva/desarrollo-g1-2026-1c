import { z } from "zod";

export const createEspecialidadSchema = z.object({
    nombre: z.string().min(3, "El nombre es requerido"),
    duracionTurnoEnMins: z.number().int().positive("La duración debe ser un número positivo").optional(),
    costoConsulta: z.number().positive("El costo debe ser un número positivo").optional()
}).strict();

export const updateEspecialidadSchema = z.object({
    nombre: z.string().min(3, "El nombre es requerido").optional(),
    duracionTurnoEnMins: z.number().int().positive("La duración debe ser un número positivo").optional(),
    costoConsulta: z.number().positive("El costo debe ser un número positivo").optional()
}).strict();

export const especialidadQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(25).default(10),
    nombre: z.string().optional()
}).strict();
