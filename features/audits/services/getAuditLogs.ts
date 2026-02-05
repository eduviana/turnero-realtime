// import { db } from "@/lib/db/prisma";
// import { requireRole } from "@/lib/roles/requireRole";

// export async function getAuditLogs() {
//   await requireRole("SUPERVISOR");

//   const logs = await db.auditLog.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       actor: {
//         select: {
//           id: true,
//           email: true,
//         },
//       },
//     },
//   });

//   return logs.map((log) => ({
//     id: log.id,
//     eventType: log.eventType,
//     action: log.action,
//     metadata: log.metadata,
//     ip: log.ip,
//     createdAt: log.createdAt.toISOString(),
//     actor: log.actor
//       ? {
//           id: log.actor.id,
//           email: log.actor.email,
//         }
//       : null,
//   }));
// }


import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { mapAuditLogToRow } from "../lib/audit-mapper";


export async function getAuditLogs() {
  await requireRole("SUPERVISOR");

  const logs = await db.auditLog.findMany({
  orderBy: { createdAt: "desc" },
  include: {
    actor: {
      select: {
        email: true,
      },
    },
  },
});

return logs.map(mapAuditLogToRow);
}