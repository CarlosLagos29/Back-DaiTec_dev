import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Primer error de cada campo: { campo: "mensaje" } (el mismo formato que usan las validaciones del front)
export const firstErrors = (error: z.ZodError) => {
    const { fieldErrors, formErrors } = z.flattenError(error);
    const errors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(fieldErrors)) {
        if (Array.isArray(messages) && messages.length) errors[field] = messages[0];
    }
    if (formErrors.length) errors._form = formErrors[0];
    return errors;
};

// Valida req.body con el esquema: si falla responde 400 con los errores; si pasa, deja en req.body
// solo los campos del esquema (ya limpios, p. ej. con trim)
export const validateBody =
    (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res
                .status(400)
                .json({ message: "Datos inválidos", errors: firstErrors(result.error) });
        }
        req.body = result.data;
        next();
    };
