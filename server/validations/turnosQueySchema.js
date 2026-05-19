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
    
    medico: z.string().optional(),
    sede: z.string().optional(),
    practica: z.string().optional(),
    especialidad: z.string().optional(),
    fechaInicio: z.coerce.date().optional(),
    fechaFin: z.coerce.date().optional()
}).strict();


