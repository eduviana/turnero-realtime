import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { serviceId } = await req.json();

    if (!serviceId) {
      return NextResponse.json(
        { message: "serviceId es requerido" },
        { status: 400 }
      );
    }

    const service = await db.service.findUnique({
      where: { id: serviceId },
      select: { id: true, code: true, currentIndex: true }
    });

    if (!service) {
      return NextResponse.json(
        { message: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    // Nuevo número de turno
    const nextNumber = service.currentIndex + 1;

    // Código del ticket, ej: FM-45
    const ticketCode = `${service.code}-${nextNumber}`;

    // Generamos el ticket
    const ticket = await db.ticket.create({
      data: {
        serviceId,
        number: nextNumber,
        code: ticketCode,
      },
      select: {
        id: true,
        code: true,
        number: true,
        createdAt: true,
        service: { select: { name: true, code: true } }
      }
    });

    // Actualizamos el currentIndex del servicio
    await db.service.update({
      where: { id: serviceId },
      data: { currentIndex: nextNumber }
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (err) {
    console.error("Error creando ticket:", err);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}