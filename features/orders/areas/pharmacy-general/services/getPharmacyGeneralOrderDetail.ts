import { db } from "@/lib/db/prisma";
import { PharmacyGeneralOrderDetail } from "../types/pharmacy-general";


export async function getPharmacyGeneralOrderDetail(
  orderId: string
): Promise<PharmacyGeneralOrderDetail | null> {
  const order = await db.pharmacyGeneralOrder.findUnique({
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

  return {
    id: order.id,
    ticketCode: order.ticket.code,

    affiliate: order.affiliate
      ? `${order.affiliate.firstName} ${order.affiliate.lastName}`.trim()
      : undefined,

    operator: `${order.operator.firstName} ${order.operator.lastName}`.trim(),

    service: order.service.name,

    createdAt: order.createdAt,

    items: order.items.map((item) => ({
      id: item.id,
      productName: item.product.name,
      quantity: item.quantity,
    })),

    totalItems: order.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),
  };
}