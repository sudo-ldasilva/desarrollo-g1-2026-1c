import { z } from "zod";

export const crearPacienteRequest = z.object({
    nombre: z.string(),
    dni: z.string().regex(/^\d{7,8}$/)
   
    //TODO
    // obraSocial: 
    // plan:
}).strict();

