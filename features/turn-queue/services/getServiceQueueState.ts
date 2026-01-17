import { prisma } from "@/lib/db/prisma";
import { ServiceQueueState } from "../types/ServiceQueueState";

export async function getServiceQueueState(
  serviceId: string
): Promise<ServiceQueueState> {
  const currentTicket = await prisma.ticket.findFirst({
    where: {
      serviceId,
      OR: [
        { status: "IN_PROGRESS" },
        { status: "CALLED" },
      ],
    },
    orderBy: [
      { status: "asc" },
      { calledAt: "desc" },
    ],
    select: {
      id: true,
      number: true,
      code: true,
      status: true,
    },
  });

  const lastCalledTickets = await prisma.ticket.findMany({
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

  const pendingCount = await prisma.ticket.count({
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