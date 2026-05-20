import { z } from "zod";

const sort = z
    .string()
    .optional()
    .refine((val) => {
        if (!val) return true;

        return val.split(",").every(part => {
            const [field, dir] = part.split(":");

            return (
                ["fechaHora", "costo"].includes(field) &&
                    (dir === "asc" || dir === "desc")
            );
        });
    }, {
        message: "sort inválido. Usar formato: fechaHora:desc,costo:asc"
    }) .transform((val) => {
        if (!val) return {};

        return Object.fromEntries(
            val.split(",").map(p => {
                const [field, dir] = p.split(":");
                return [field, dir === "desc" ? -1 : 1];
            })
        );
    });

export const turnosQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(25).default(10),

    sort: sort,

    estado: z.enum([
        "DISPONIBLE", 
        "RESERVADO", 
        "CONFIRMADO", 
        "CANCELADO", 
        "REALIZADO", 
        "PENDIENTE_REPROGRAMACION"
    ]).optional(),
    
    medico: z.string().regex(/^[0-9a-fA-F]{24}$/, "El formato del ID de medico no es válido").optional(),
    sede: z.string().regex(/^[0-9a-fA-F]{24}$/, "El formato del ID de sede no es válido").optional(),
    practica: z.string().regex(/^[0-9a-fA-F]{24}$/, "El formato del ID de practica no es válido").optional(),
    especialidad: z.string().regex(/^[0-9a-fA-F]{24}$/, "El formato del ID de especialidad no es válido").optional(),
    fechaInicio: z.coerce.date().optional(),
    fechaFin: z.coerce.date().optional()
}).strict();


