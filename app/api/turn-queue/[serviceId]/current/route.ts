import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { pusherServer } from "@/lib/pusher/server";

import { handleCurrentTicket } from "@/features/turn-queue/services/handleCurrentTicket";
import {
  TURN_QUEUE_ACTIONS,
  TurnQueueAction,
} from "@/features/turn-queue/types/TurnQueueAction";

interface CompletePayloadItem {
  productId: string;
  quantity: number;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  const { serviceId } = await params;

  // 🔐 Auth
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const operator = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!operator) {
    return NextResponse.json({ error: "Operator not found" }, { status: 401 });
  }

  // 📦 Body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { action, items } = body as {
    action?: unknown;
    items?: CompletePayloadItem[];
  };

  if (!TURN_QUEUE_ACTIONS.includes(action as TurnQueueAction)) {
    return NextResponse.json(
      { error: "Invalid or missing action" },
      { status: 400 }
    );
  }

  // 🎯 Dominio principal: transición del ticket
  const ticket = await handleCurrentTicket({
    serviceId,
    operatorId: operator.id,
    action: action as TurnQueueAction,
  });

  if (!ticket) {
    return NextResponse.json(
      { error: "Invalid ticket state for action" },
      { status: 409 }
    );
  }

  /**
   * 🧠 Side effect: Farmacia Medicamentos
   * Se ejecuta SOLO al completar el turno
   */
  if (action === "COMPLETE") {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { code: true },
    });

    if (service?.code === "FM") {
      if (!Array.isArray(items) || items.length === 0) {
        // Decisión explícita: permitir finalizar sin medicamentos
        console.warn(
          "[POST /current] COMPLETE FM without medication items",
          { ticketId: ticket.id }
        );
      } else {
        await prisma.pharmacyMedicationOrder.create({
          data: {
            ticketId: ticket.id,
            serviceId,
            operatorId: operator.id,
            affiliateId: ticket.affiliateId ?? null,
            items: {
              create: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        });
      }
    }
  }

  /**
   * 🔔 UI update (cola)
   */
  await pusherServer.trigger(
    `turn-queue-${serviceId}`,
    "updated",
    {}
  );

  /**
   * 🔔 Evento genérico de dominio
   */
  await pusherServer.trigger("tickets", "ticket.updated", {
    ticketId: ticket.id,
    serviceId,
    action,
  });

  return NextResponse.json({
    action,
    ticket,
  });
}