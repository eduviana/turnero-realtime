// import { db } from "@/lib/db/prisma";
// import { NextResponse } from "next/server";
// import { auditService } from "@/lib/audit/auditService";
// import { AuditActions } from "@/lib/audit/auditActions";

// export async function POST(req: Request) {
//   try {
//     const { serviceId } = await req.json();

//     if (!serviceId) {
//       return NextResponse.json(
//         { message: "serviceId es requerido" },
//         { status: 400 }
//       );
//     }

//     const service = await db.service.findUnique({
//       where: { id: serviceId },
//       select: { id: true, code: true, currentIndex: true, name: true },
//     });

//     if (!service) {
//       return NextResponse.json(
//         { message: "Servicio no encontrado" },
//         { status: 404 }
//       );
//     }

//     // Generamos siguiente número de turno
//     const nextNumber = service.currentIndex + 1;

//     // Código del ticket: ej "FM-45"
//     const ticketCode = `${service.code}-${nextNumber}`;

//     // Creamos el ticket
//     const ticket = await db.ticket.create({
//       data: {
//         serviceId,
//         number: nextNumber,
//         code: ticketCode,
//       },
//       select: {
//         id: true,
//         code: true,
//         number: true,
//         createdAt: true,
//         service: { select: { name: true, code: true } },
//       },
//     });

//     // Actualizamos el contador del servicio
//     await db.service.update({
//       where: { id: serviceId },
//       data: { currentIndex: nextNumber },
//     });

//     // Auditoría: generación de ticket
//     await auditService.record({
//       action: AuditActions.TICKET_CREADO,
//       actorId: null, // flujo público sin operador autenticado
//       metadata: {
//         serviceId: service.id,
//         serviceName: service.name,
//         ticketId: ticket.id,
//         ticketCode: ticket.code,
//         ticketNumber: ticket.number,
//       },
//     });

//     return NextResponse.json(ticket, { status: 201 });
//   } catch (err) {
//     console.error("Error creando ticket:", err);

//     // Auditoría de error (opcional y recomendado)
//     await auditService.record({
//       action: AuditActions.TICKET_NO_CREADO,
//       actorId: null,
//       metadata: {
//         error: err instanceof Error ? err.message : err,
//       },
//     });

//     return NextResponse.json(
//       { message: "Error interno del servidor" },
//       { status: 500 }
//     );
//   }
// }





import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { auditService } from "@/lib/audit/auditService";
import { AuditActions } from "@/lib/audit/auditActions";

export async function POST(req: Request) {
  try {
    const { serviceId, dni } = await req.json(); // <-- IMPORTANTE: leer dni

    if (!serviceId) {
      return NextResponse.json(
        { message: "serviceId es requerido" },
        { status: 400 }
      );
    }

    const service = await db.service.findUnique({
      where: { id: serviceId },
      select: { id: true, code: true, currentIndex: true, name: true }
    });

    if (!service) {
      return NextResponse.json(
        { message: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    // Generar número de turno
    const nextNumber = service.currentIndex + 1;

    const ticketCode = `${service.code}-${nextNumber}`;

    // Crear ticket
    const ticket = await db.ticket.create({
      data: {
        serviceId,
        number: nextNumber,
        code: ticketCode,
        // dni,  <-- también podés guardarlo en el ticket si querés (opcional)
      },
      select: {
        id: true,
        code: true,
        number: true,
        createdAt: true,
        service: { select: { name: true, code: true } }
      }
    });

    // Actualizar índice del servicio
    await db.service.update({
      where: { id: serviceId },
      data: { currentIndex: nextNumber }
    });

    // Auditoría: ticket creado
    await auditService.record({
      action: AuditActions.TICKET_CREADO,
      actorId: null,
      metadata: {
        dni,                         // <-- DNI ahora registrado correctamente
        serviceId: service.id,
        serviceName: service.name,
        ticketId: ticket.id,
        ticketCode: ticket.code,
        ticketNumber: ticket.number
      }
    });

    return NextResponse.json(ticket, { status: 201 });

  } catch (err) {
    console.error("Error creando ticket:", err);

    // Auditoría de error
    await auditService.record({
      action: AuditActions.TICKET_NO_CREADO,
      actorId: null,
      metadata: {
        error: err instanceof Error ? err.message : err
      }
    });

    return NextResponse.json(
        { message: "Error interno del servidor" },
        { status: 500 }
    );
  }
}