import { z } from "zod";

export const validarNotificacion = z.object({
    notificacionId: z.string().min(1),
    destinatario: z.string().min(1),
    remitente: z.string().min(1),
    mensaje: z.string().min(3).max(500),
    fechaHoraCreacion: z.coerce.date().optional(),
    fechaHoraLeida: z.coerce.date().optional(),
    leida: z.boolean().default(false)
}).strict();