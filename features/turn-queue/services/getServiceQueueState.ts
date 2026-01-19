import { db } from "@/lib/db/prisma";
import { ServiceQueueState } from "../types/ServiceQueueState";

export async function getServiceQueueState(
  serviceId: string,
): Promise<ServiceQueueState> {
  const currentTicketRaw = await db.ticket.findFirst({
    where: {
      serviceId,
      OR: [{ status: "IN_PROGRESS" }, { status: "CALLED" }],
    },
    orderBy: [{ status: "asc" }, { calledAt: "desc" }],
    select: {
      id: true,
      number: true,
      code: true,
      status: true,
      startedAt: true,
      calledAt: true,
    },
  });

  const currentTicket = currentTicketRaw
    ? {
        id: currentTicketRaw.id,
        number: currentTicketRaw.number,
        code: currentTicketRaw.code,
        status: currentTicketRaw.status,
        startedAt: currentTicketRaw.startedAt
          ? currentTicketRaw.startedAt.toISOString()
          : null,
        calledAt: currentTicketRaw.calledAt
          ? currentTicketRaw.calledAt.toISOString()
          : null,
      }
    : null;

  const lastCalledTickets = await db.ticket.findMany({
    where: {
      serviceId,
      status: {
        in: ["CALLED", "IN_PROGRESS", "COMPLETED"],
      },
    },
    orderBy: {
      calledAt: "desc",
    },
    take: 5,
    select: {
      id: true,
      number: true,
      code: true,
      status: true,
    },
  });

  const pendingCount = await db.ticket.count({
    where: {
      serviceId,
      status: "PENDING",
    },
  });

  return {
    currentTicket,
    lastCalledTickets,
    pendingCount,
  };
}