import { z } from "zod";
import {
  AffiliateStatus,
  AffiliateStatusReason,
} from "@/generated/prisma/enums";

export const affiliateEditSchema = z.object({
  dni: z
    .string()
    .min(6, "El DNI debe tener al menos 6 dígitos")
    .max(9, "El DNI no puede superar los 9 dígitos")
    .regex(/^[0-9]+$/, "El DNI solo puede contener números")
    .transform((value) => value.trim()),
  firstName: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().min(2, "El apellido es obligatorio"),
  phone: z.string().nullable().optional(),
  email: z.string().email("Email inválido").nullable().optional(),
  provinceId: z.number().int().positive("Provincia requerida"),
  cityId: z.number().int().positive("Ciudad requerida"),
  status: z.nativeEnum(AffiliateStatus),
  statusReason: z.nativeEnum(AffiliateStatusReason),
});

export type AffiliateEditSchema = z.infer<typeof affiliateEditSchema>;
