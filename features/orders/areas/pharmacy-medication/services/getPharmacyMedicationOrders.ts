import { db } from "@/lib/db/prisma";
import { PharmacyMedicationOrder } from "../types/pharmacy-medication";
import { Prisma } from "@/generated/prisma/client";

/**
 * Obtiene las órdenes de farmacia medicamentos.
 * Pensado para server components.
 */
export async function getPharmacyMedicationOrders(): Promise<
  PharmacyMedicationOrder[]
> {
  const orders = await db.pharmacyMedicationOrder.findMany({
    include: {
      ticket: { select: { code: true } },
      affiliate: {
        select: { id: true, dni: true, firstName: true, lastName: true },
      },
      operator: {
        select: { id: true, firstName: true, lastName: true },
      },
      service: { select: { id: true, name: true } },
      items: true, // 👈 NECESARIO para calcular total
    },
  });

  return orders.map((order) => {
    const totalAmount = order.items.reduce(
      (acc, item) => acc.add(item.unitPrice.mul(item.quantity)),
      new Prisma.Decimal(0)
    );

    return {
      id: order.id,
      ticketCode: order.ticket.code,
      createdAt: order.createdAt.toISOString(),

      operator: {
        id: order.operator.id,
        fullName: `${order.operator.firstName} ${order.operator.lastName}`,
      },

      affiliate: order.affiliate
        ? {
            id: order.affiliate.id,
            dni: order.affiliate.dni,
            fullName: `${order.affiliate.firstName} ${order.affiliate.lastName}`,
          }
        : undefined,

      service: {
        id: order.service.id,
        name: order.service.name,
      },

      itemsCount: order.items.length,
      totalAmount: totalAmount.toString(),
    };
  });
}