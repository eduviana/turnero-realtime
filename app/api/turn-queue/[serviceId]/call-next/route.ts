import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { pusherServer } from "@/lib/pusher/server";

import { callNextTicket } from "@/features/turn-queue/services/callNextTicket";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  const { serviceId } = await params;
  console.log("[POST /call-next]", serviceId);

  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const operator = await prisma.user.findFirst({
    where: {
      clerkId: clerkUserId,
      deletedAt: null,
      role: "OPERATOR",
    },
    select: { id: true },
  });

  if (!operator) {
    return NextResponse.json({ error: "Operator not found" }, { status: 403 });
  }

  const ticket = await callNextTicket({
    serviceId,
    operatorId: operator.id,
  });

  if (!ticket) {
    return NextResponse.json(
      { error: "No pending tickets" },
      { status: 409 }
    );
  }

  await pusherServer.trigger(
    `turn-queue-${serviceId}`,
    "updated",
    {}
  );

  return NextResponse.json(ticket);
}