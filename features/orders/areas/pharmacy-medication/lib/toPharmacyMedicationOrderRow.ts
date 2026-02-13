import {
  PharmacyMedicationOrder,
  PharmacyMedicationOrderRow,
} from "../types/pharmacy-medication";

export function toPharmacyMedicationOrderRow(
  order: PharmacyMedicationOrder
): PharmacyMedicationOrderRow {
  return {
    id: order.id,

    affiliate: order.affiliate
      ? `${order.affiliate.fullName} (${order.affiliate.dni})`
      : "—",

    operator: order.operator.fullName,

    totalAmount: order.totalAmount,

    createdAt: new Date(order.createdAt),
  };
}