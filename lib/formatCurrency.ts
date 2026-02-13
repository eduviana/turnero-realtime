/**
 * Formatea un valor monetario para UI.
 * - Entrada esperada: string | number (ej: "1500.00")
 * - Salida: "$ 1.500,00"
 *
 * No realiza cálculos, solo presentación.
 */
export function formatCurrency(
  value: string | number,
  options?: {
    locale?: string;
    currency?: string;
  }
): string {
  const locale = options?.locale ?? "es-AR";
  const currency = options?.currency ?? "ARS";

  const numericValue =
    typeof value === "string" ? Number(value) : value;

  if (Number.isNaN(numericValue)) {
    return "—";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}