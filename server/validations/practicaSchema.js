import { z } from "zod";

export const createPracticaSchema = z.object({
    codigo: z.string().min(3, "El código es requerido"),
    nombre: z.string().min(1, "El nombre es requerido"),
    duracionTurnoEnMins: z.number().int().positive("La duración debe ser un número positivo").optional(),
    costo: z.number().positive("El costo debe ser un número positivo").optional()
}).strict();

export const updatePracticaSchema = z.object({
    codigo: z.string().min(3, "El código es requerido").optional(),
    nombre: z.string().min(1, "El nombre es requerido").optional(),
    duracionTurnoEnMins: z.number().int().positive("La duración debe ser un número positivo").optional(),
    costo: z.number().positive("El costo debe ser un número positivo").optional()
}).strict();

export const practicaQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(25).default(10),
    codigo: z.string().optional(),
    nombre: z.string().optional()
}).strict();
