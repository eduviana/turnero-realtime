import { db } from "@/lib/db/prisma";


export async function getAuditsByAction() {
  const result = await db.auditLog.groupBy({
    by: ["action"],
    _count: {
      action: true,
    },
    orderBy: {
      _count: {
        action: "desc",
      },
    },
  });

  return result.map((r) => ({
    action: r.action,
    total: r._count.action,
  }));
}