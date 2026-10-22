import { z } from "zod";

export const profecionalCreateSchema = z.object({
    name: z.string({ error: "El nombre es obligatorio" }).trim().min(1, "El nombre es obligatorio"),
    img: z.string({ error: "La foto es obligatoria" }).trim().min(1, "La foto es obligatoria"),
    description: z
        .string({ error: "La descripción es obligatoria" })
        .trim()
        .min(1, "La descripción es obligatoria"),
    services: z.array(z.string().trim().min(1, "El servicio no puede estar vacío"), {
        error: "Los servicios tienen que ser una lista",
    }),
});

export const profecionalUpdateSchema = profecionalCreateSchema.partial();
