import { z } from "zod";

export const promoCreateSchema = z.object({
    name: z.string({ error: "El nombre es obligatorio" }).trim().min(1, "El nombre es obligatorio"),
    url: z.string({ error: "La imagen es obligatoria" }).trim().min(1, "La imagen es obligatoria"),
});
