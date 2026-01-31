import { z } from "zod";

export const createAffiliateSchema = z.object({
  dni: z
    .string()
    .trim()
    .min(1, "El DNI es obligatorio")
    .min(6, "El DNI debe tener al menos 6 dígitos")
    .regex(/^\d+$/, "El DNI solo puede contener números"),

  firstName: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  lastName: z
    .string()
    .trim()
    .min(1, "El apellido es obligatorio")
    .min(3, "El apellido debe tener al menos 3 caracteres"),

  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .pipe(
      z.email({
        message: "El email no tiene un formato válido",
      })
    ),

  provinceId: z
    .coerce
    .number()
    .refine((v) => !Number.isNaN(v), {
      message: "La provincia es obligatoria",
    }),

  cityId: z
    .coerce
    .number()
    .refine((v) => !Number.isNaN(v), {
      message: "La ciudad es obligatoria",
    }),

  organizationId: z
    .coerce
    .number()
    .optional(),
});

export type CreateAffiliateInput = z.infer<
  typeof createAffiliateSchema
>;