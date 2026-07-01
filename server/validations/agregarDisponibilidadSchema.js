import { z } from "zod";
import { DiaSemana } from "../domain/DiaSemana.js";

export const agregarDisponibilidadSchema = z.object({
    horaInicio: z.string(),
    horaFin: z.string(),
    diasSemana: z.array(z.nativeEnum(DiaSemana)),
    sede: z.string(),
    especialidad: z.string().optional(),
    practica: z.string().optional()
}).refine((data) => data.especialidad || data.practica, {
    message: "Debe seleccionar una especialidad o una práctica para esta disponibilidad.",
    path: ["servicio"] 
}).refine((data) => !(data.especialidad && data.practica), {
    message: "Debe seleccionar SOLO una especialidad o SOLO una práctica, no ambas a la vez.",
    path: ["servicio"]
});