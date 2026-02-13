import { db } from "@/lib/db/prisma";

import { Prisma } from "@/generated/prisma/client";
import { PharmacyMedicationOrderDetail } from "../types/pharmacy-medication";

export async function getPharmacyGeneralOrderDetail(
  orderId: string
): Promise<PharmacyMedicationOrderDetail | null> {
  const order = await db.pharmacyMedicationOrder.findUnique({
    where: { id: orderId },
    include: {
      ticket: {
        select: { code: true },
      },
      service: {
        select: { name: true },
      },
      operator: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      affiliate: {
        select: {
          id: true,
          dni: true,
          firstName: true,
          lastName: true,
        },
      },
      items: {
        include: {
          product: {
            select: { name: true },
          },
        },
      },
    },
  });

  if (!order) return null;

  let totalAmount = new Prisma.Decimal(0);

  const items = order.items.map((item) => {
    const totalPrice = item.unitPrice.mul(item.quantity);
    totalAmount = totalAmount.add(totalPrice);

    return {
      id: item.id,
      productName: item.product.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    };
  });

  return {
    id: order.id,
    ticketCode: order.ticket.code,

    affiliate: order.affiliate
      ? {
          id: order.affiliate.id,
          dni: order.affiliate.dni,
          fullName: `${order.affiliate.firstName} ${order.affiliate.lastName}`.trim(),
        }
      : undefined,

    operator: `${order.operator.firstName} ${order.operator.lastName}`.trim(),
    service: order.service.name,
    createdAt: order.createdAt.toISOString(),

    items,

    totalItems: order.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),

    totalAmount: totalAmount.toFixed(2),
  };
}