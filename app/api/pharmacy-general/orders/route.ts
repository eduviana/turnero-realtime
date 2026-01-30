import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  // 1️⃣ Auth
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { ticketId, items } = body as {
    ticketId?: string;
    items?: { productId: string; quantity: number }[];
  };

  if (!ticketId || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "ticketId and items are required" },
      { status: 400 }
    );
  }

  // 3️⃣ Operator
  const operator = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!operator) {
    return NextResponse.json({ error: "Operator not found" }, { status: 404 });
  }

  // 4️⃣ Ticket
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: {
      id: true,
      status: true,
      serviceId: true,
      affiliateId: true,
      service: {
        select: { code: true },
      },
    },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  if (ticket.status !== "IN_PROGRESS") {
    return NextResponse.json(
      { error: "Ticket is not in progress" },
      { status: 409 }
    );
  }

  // 👇 código de servicio de farmacia general
  if (ticket.service.code !== "FG") {
    return NextResponse.json(
      { error: "Invalid service for pharmacy general" },
      { status: 409 }
    );
  }

  // 5️⃣ Create order
  const order = await prisma.pharmacyGeneralOrder.create({
    data: {
      ticketId: ticket.id,
      serviceId: ticket.serviceId,
      operatorId: operator.id,
      affiliateId: ticket.affiliateId ?? undefined,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  return NextResponse.json(order, { status: 201 });
}