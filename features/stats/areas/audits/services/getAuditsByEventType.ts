import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { AuditsByEventTypeStat } from "../types/audit-stats";

export async function getAuditsByEventType(): Promise<
  AuditsByEventTypeStat[]
> {
  await requireRole("SUPERVISOR");

  const result = await db.auditLog.groupBy({
    by: ["eventType"],
    _count: {
      _all: true,
    },
  });

  return result.map((row) => ({
    eventType: row.eventType,
    total: row._count._all,
  }));
}