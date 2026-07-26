import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher/server";
import { handleCurrentTicket } from "@/features/turn-queue/services/handleCurrentTicket";
import {
  TURN_QUEUE_ACTIONS,
  TurnQueueAction,
} from "@/features/turn-queue/types/TurnQueueAction";
import { db } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth";
import { updateUserActivity } from "@/lib/updateUserActivity";

interface CompletePayloadItem {
  productId: string;
  quantity: number;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ serviceId: string }> },
) {
  const { serviceId } = await params;

  const sessionUser = await getCurrentUser();
  if (!sessionUser?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const operator = await db.user.findUnique({
    where: { id: sessionUser.id },
    select: { id: true },
  });

  if (!operator) {
    return NextResponse.json({ error: "Operator not found" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { action, items } = body as {
    action?: unknown;
    items?: CompletePayloadItem[];
  };

  if (!TURN_QUEUE_ACTIONS.includes(action as TurnQueueAction)) {
    return NextResponse.json(
      { error: "Invalid or missing action" },
      { status: 400 },
    );
  }

  const ticket = await handleCurrentTicket({
    serviceId,
    operatorId: operator.id,
    action: action as TurnQueueAction,
  });

  if (!ticket) {
    return NextResponse.json(
      { error: "Invalid ticket state for action" },
      { status: 409 },
    );
  }

  await updateUserActivity(operator.id);

  if (action === "COMPLETE") {
    const service = await db.service.findUnique({
      where: { id: serviceId },
      select: { code: true },
    });
  }

  await pusherServer.trigger(`turn-queue-${serviceId}`, "updated", {});

  await pusherServer.trigger("tickets", "ticket.updated", {
    ticketId: ticket.id,
    serviceId,
    action,
  });

  await pusherServer.trigger("turn-screen", "updated", {});

  return NextResponse.json({
    action,
    ticket,
  });
}
