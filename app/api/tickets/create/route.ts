import { db } from "@/lib/db/prisma";
import { pusherServer } from "@/lib/pusher/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { serviceId, dni } = await req.json();

    if (!serviceId) {
      return NextResponse.json(
        { message: "serviceId es requerido" },
        { status: 400 }
      );
    }

    if (!dni) {
      return NextResponse.json(
        { message: "dni es requerido" },
        { status: 400 }
      );
    }

    // 🔍 Resolver afiliado
    const affiliate = await db.affiliate.findUnique({
      where: { dni },
      select: { id: true },
    });

    if (!affiliate) {
      return NextResponse.json(
        { message: "Afiliado no encontrado" },
        { status: 404 }
      );
    }

    // 🔍 Servicio
    const service = await db.service.findUnique({
      where: { id: serviceId },
      select: { id: true, code: true, currentIndex: true, name: true },
    });

    if (!service) {
      return NextResponse.json(
        { message: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    const nextNumber = service.currentIndex + 1;
    const ticketCode = `${service.code}-${nextNumber}`;

    // 🎟️ Crear ticket CON affiliateId
    const ticket = await db.ticket.create({
      data: {
        serviceId,
        affiliateId: affiliate.id,
        number: nextNumber,
        code: ticketCode,
      },
      select: {
        id: true,
        code: true,
        number: true,
        createdAt: true,
        service: { select: { name: true, code: true } },
      },
    });

    await db.service.update({
      where: { id: serviceId },
      data: { currentIndex: nextNumber },
    });

    // 🔔 Evento de cola
    await pusherServer.trigger(`turn-queue-${serviceId}`, "updated", {});

    return NextResponse.json(ticket, { status: 201 });
  } catch (err) {
    console.error("Error creando ticket:", err);

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}