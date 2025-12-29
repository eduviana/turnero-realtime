// import { db } from "@/lib/db/prisma";
// import { requireRole } from "@/lib/roles/requireRole";
// import { NextResponse } from "next/server";


// export async function PATCH(req: Request, context: any) {
//   // ───────────────────────────────
//   // Autorización
//   // ───────────────────────────────
//   const guard = await requireRole("ADMIN");
//   if (!guard.ok) return guard.response;
//   try {
//     // NO destructurar arriba – Turbopack rompe params
//     const { id } = await context.params;

//     const body = await req.json();
//     const { isActive } = body;

//     if (typeof isActive !== "boolean") {
//       return new NextResponse("Invalid isActive value", { status: 400 });
//     }

//     console.log("PATCH request received:", id, { isActive });

//     const updated = await db.service.update({
//       where: { id },
//       data: { isActive },
//     });

//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error("Error actualizando servicio:", error);
//     return new NextResponse("Error updating service", { status: 500 });
//   }
// }








import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { NextResponse } from "next/server";

import { auditService } from "@/lib/audit/auditService";
import {
  AuditAction,
  AuditEntity,
  AuditEventType,
} from "@/generated/prisma/client";

export async function PATCH(req: Request, context: any) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return guard.response;

  try {
    const { id } = await context.params;
    const { isActive } = await req.json();

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "Invalid isActive value" },
        { status: 400 }
      );
    }

    const service = await db.service.findUnique({
      where: { id },
      select: { isActive: true },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    if (service.isActive === isActive) {
      return NextResponse.json(service);
    }

    const updated = await db.service.update({
      where: { id },
      data: { isActive },
    });

    await auditService.record({
      eventType: AuditEventType.FUNCTIONAL,
      action: AuditAction.STATUS_CHANGE,
      entity: AuditEntity.SERVICE,
      entityId: id,

      actorId: guard.userId,
      actorRole: guard.role,

      metadata: {
        previousValue: service.isActive,
        currentValue: isActive,
        source: "ADMIN_UI",
      },

      ip: req.headers.get("x-forwarded-for"),
      userAgent: req.headers.get("user-agent"),
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error actualizando servicio:", error);
    return NextResponse.json(
      { error: "Error updating service" },
      { status: 500 }
    );
  }
}