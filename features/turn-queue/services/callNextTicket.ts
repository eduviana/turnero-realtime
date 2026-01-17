import { prisma } from "@/lib/db/prisma";
import { TicketStatus } from "@/generated/prisma/enums";

interface CallNextTicketParams {
  serviceId: string;
  operatorId: string;
}

export async function callNextTicket({
  serviceId,
  operatorId,
}: CallNextTicketParams) {
  return prisma.$transaction(async (tx) => {
    // 🔒 1️⃣ Tomar el siguiente ticket pendiente con lock
    const [ticket] = await tx.$queryRaw<
      { id: string }[]
    >`
      SELECT id
      FROM "Ticket"
      WHERE "serviceId" = ${serviceId}
        AND "status" = ${TicketStatus.PENDING}
      ORDER BY "createdAt" ASC
      LIMIT 1
      FOR UPDATE
    `;

    if (!ticket) {
      return null;
    }

    // 2️⃣ Actualizar estado de forma atómica
    return tx.ticket.update({
      where: { id: ticket.id },
      data: {
        status: TicketStatus.CALLED,
        calledAt: new Date(),
        handledById: operatorId,
      },
    });
  });
}