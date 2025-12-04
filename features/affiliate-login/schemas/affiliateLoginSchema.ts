import { z } from "zod";

export const affiliateLoginSchema = z.object({
  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(9, "El DNI no puede superar los 9 dígitos")
    .regex(/^[0-9]+$/, "El DNI solo puede contener números")
    .transform((value) => value.trim()),
});

export type AffiliateLoginSchema = z.infer<typeof affiliateLoginSchema>;