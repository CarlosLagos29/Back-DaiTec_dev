import { z } from "zod";

// Mismas reglas que FrontDaiTec_dev/src/components/SuperAdmin/ValidationSuperAdmin (copia a mano)

const twoDecimals = "puede tener hasta dos decimales";

export const colorSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Debe agregar un color")
        .max(100, "El nombre del color es demasiado largo!"),
    availity: z
        .number({ error: "La disponibilidad tiene que ser un número" })
        .min(0, "La disponibilidad no puede ser menor a 0")
        .multipleOf(0.01, `La disponibilidad ${twoDecimals}`),
});

const productBase = z.object({
    name: z
        .string({ error: "El nombre es obligatorio" })
        .trim()
        .min(4, "El nombre del producto debe tener por lo menos 4 letras")
        .max(100, "El nombre del producto es demasiado largo!"),
    price: z
        .number({ error: "Por favor determine un precio" })
        .min(1, "Por favor determine un precio mayor a 0")
        .multipleOf(0.01, `El precio ${twoDecimals}`),
    discount: z
        .number({ error: "El descuento tiene que ser un número" })
        .min(0, "El descuento no puede ser negativo")
        .lt(100, "El descuento no puede ser o superar el %100")
        .multipleOf(0.01, `El descuento ${twoDecimals}`)
        .optional(),
    description: z
        .string({ error: "La descripción es obligatoria" })
        .trim()
        .min(10, "Ponga alguna descripción de por lo menos 10 caracteres"),
    img: z
        .array(z.string().trim().min(1), { error: "Las imágenes tienen que ser una lista de URLs" })
        .min(1, "Por favor agregue por lo menos una imagen"),
    available: z
        .number({ error: "La disponibilidad tiene que ser un número" })
        .min(0, "La disponibilidad no puede ser menor a 0")
        .multipleOf(0.01, `La disponibilidad ${twoDecimals}`)
        .optional(),
    colors: z.array(colorSchema).optional(),
    source: z.enum(["skincares", "makeups", "generals"], {
        error: "El tipo de producto tiene que ser skincares, makeups o generals",
    }),
    skinType: z
        .enum(["Facial", "Corporal", "Facial y Corporal"], { error: "Seleccione el tipo de piel" })
        .optional(),
    crema: z.string().trim().optional(),
});

// Los skincares necesitan tipo de piel y de crema. `when` hace que se chequee aunque fallen otros campos
const sourceOnly = productBase.pick({ source: true });

export const productCreateSchema = productBase
    .refine((p) => p.source !== "skincares" || !!p.skinType, {
        path: ["skinType"],
        message: "Seleccione el tipo de piel",
        when: (payload) => sourceOnly.safeParse(payload.value).success,
    })
    .refine((p) => p.source !== "skincares" || !!p.crema, {
        path: ["crema"],
        message: "Ponga que tipo de crema es, si hidratante, reparadora, etc.",
        when: (payload) => sourceOnly.safeParse(payload.value).success,
    });

// En la edición todos los campos son opcionales, pero los que vienen se validan igual
export const productUpdateSchema = productBase.partial();
