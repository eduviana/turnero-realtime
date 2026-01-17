import { prisma } from "@/lib/db/prisma";
import { TicketStatus } from "@/generated/prisma/enums";
import { TurnQueueAction } from "../types/TurnQueueAction";

interface HandleCurrentTicketParams {
  serviceId: string;
  operatorId: string; // ya es ID interno
  action: TurnQueueAction;
}

export async function handleCurrentTicket({
  serviceId,
  operatorId,
  action,
}: HandleCurrentTicketParams) {
  // 1️⃣ Ya tenemos el operador interno, no necesitamos buscarlo
  const userId = operatorId;

  // 2️⃣ Buscar ticket actual
  const ticket = await prisma.ticket.findFirst({
    where: {
      serviceId,
      status: {
        in: ["CALLED", "IN_PROGRESS"],
      },
    },
    orderBy: {
      calledAt: "desc",
    },
  });

  if (!ticket) {
    return null;
  }

  // 3️⃣ Resolver transición
  let nextStatus: TicketStatus;
  const now = new Date();

  switch (action) {
    case "START":
      if (ticket.status !== TicketStatus.CALLED) return null;
      nextStatus = TicketStatus.IN_PROGRESS;
      break;

    case "COMPLETE":
      if (ticket.status !== TicketStatus.IN_PROGRESS) return null;
      nextStatus = TicketStatus.COMPLETED;
      break;

    case "CANCEL":
      nextStatus = TicketStatus.CANCELLED;
      break;

    case "NO_SHOW":
      nextStatus = TicketStatus.NO_SHOW;
      break;

    default:
      return null;
  }

  // 4️⃣ Preparar datos a actualizar
  const data: {
    status: TicketStatus;
    startedAt?: Date;
    completedAt?: Date;
    handledById: string;
    waitingSeconds?: number;
    durationSeconds?: number;
  } = {
    status: nextStatus,
    handledById: userId,
  };

  if (nextStatus === TicketStatus.IN_PROGRESS) {
    data.startedAt = now;
    if (ticket.calledAt) {
      data.waitingSeconds = Math.floor(
        (now.getTime() - ticket.calledAt.getTime()) / 1000
      );
    }
  }

  if (
    nextStatus === TicketStatus.COMPLETED ||
    nextStatus === TicketStatus.CANCELLED ||
    nextStatus === TicketStatus.NO_SHOW
  ) {
    data.completedAt = now;
    if (ticket.startedAt) {
      data.durationSeconds = Math.floor(
        (now.getTime() - ticket.startedAt.getTime()) / 1000
      );
    }
  }

  // 5️⃣ Persistir cambios
  return prisma.ticket.update({
    where: { id: ticket.id },
    data,
  });
}
