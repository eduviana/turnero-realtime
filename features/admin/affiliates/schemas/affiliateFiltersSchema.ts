// import { z } from "zod";

// const emptyStringToUndefined = (v?: string) => (v === "" ? undefined : v);

// export const affiliateFiltersSchema = z.object({
//   dni: z
//     .string()
//     .trim()
//     .transform(emptyStringToUndefined)
//     .refine(
//       (v) => v === undefined || /^[0-9]+$/.test(v),
//       "El DNI solo puede contener números"
//     )
//     .refine(
//       (v) => v === undefined || v.length >= 7,
//       "El DNI debe tener al menos 7 dígitos"
//     )
//     .refine(
//       (v) => v === undefined || v.length <= 9,
//       "El DNI no puede superar los 9 dígitos"
//     )
//     .optional(),

//   organization: z
//     .string()
//     .trim()
//     .transform(emptyStringToUndefined)
//     .refine(
//       (v) => v === undefined || v.length >= 2,
//       "La organización debe tener al menos 2 caracteres"
//     )
//     .optional(),

//   province: z
//     .string()
//     .trim()
//     .transform(emptyStringToUndefined)
//     .refine(
//       (v) => v === undefined || v.length >= 2,
//       "La provincia debe tener al menos 2 caracteres"
//     )
//     .optional(),

//   city: z
//     .string()
//     .trim()
//     .transform(emptyStringToUndefined)
//     .refine(
//       (v) => v === undefined || v.length >= 2,
//       "La ciudad debe tener al menos 2 caracteres"
//     )
//     .optional(),

//   status: z.enum(["ACTIVE", "SUSPENDED", "INACTIVE"]).optional(),

//   statusReason: z
//     .enum([
//       "DEBT",
//       "MISSING_DOCUMENTATION",
//       "VOLUNTARY_LEAVE",
//       "ADMIN_DECISION",
//     ])
//     .optional(),

//   createdFrom: z.string().transform(emptyStringToUndefined).optional(),

//   createdTo: z.string().transform(emptyStringToUndefined).optional(),

//   limit: z.number().int().positive().max(100).optional(),
// });

// export type AffiliateFiltersForm = z.infer<typeof affiliateFiltersSchema>;





import { z } from "zod";

/**
 * Normaliza strings vacíos a undefined
 * (solo para inputs de texto reales)
 */
const emptyStringToUndefined = (v?: string) =>
  v === "" ? undefined : v;

export const affiliateFiltersSchema = z.object({
  dni: z
    .string()
    .trim()
    .transform(emptyStringToUndefined)
    .refine(
      (v) => v === undefined || /^[0-9]+$/.test(v),
      "El DNI solo puede contener números"
    )
    .refine(
      (v) => v === undefined || v.length >= 7,
      "El DNI debe tener al menos 7 dígitos"
    )
    .refine(
      (v) => v === undefined || v.length <= 9,
      "El DNI no puede superar los 9 dígitos"
    )
    .optional(),

  /**
   * Todavía texto (más adelante se normaliza)
   */
  organization: z
    .string()
    .trim()
    .transform(emptyStringToUndefined)
    .refine(
      (v) => v === undefined || v.length >= 2,
      "La organización debe tener al menos 2 caracteres"
    )
    .optional(),

  /**
   * 🔑 IDs normalizados
   */
  provinceId: z
    .number()
    .int()
    .positive()
    .optional(),

  cityId: z
    .number()
    .int()
    .positive()
    .optional(),

  status: z
    .enum(["ACTIVE", "SUSPENDED", "INACTIVE"])
    .optional(),

  statusReason: z
    .enum([
      "DEBT",
      "MISSING_DOCUMENTATION",
      "VOLUNTARY_LEAVE",
      "ADMIN_DECISION",
    ])
    .optional(),

  /**
   * Se reciben como string (input date)
   * Se transforman a Date en route.ts
   */
  createdFrom: z
    .string()
    .transform(emptyStringToUndefined)
    .optional(),

  createdTo: z
    .string()
    .transform(emptyStringToUndefined)
    .optional(),

  limit: z.number().int().positive().max(100).optional(),
});

export type AffiliateFiltersForm = z.infer<
  typeof affiliateFiltersSchema
>;