// import { prisma } from "@/lib/db/prisma";

// interface AuditMetadata {
//   [key: string]: any;
// }

// export const auditService = {
//   async record(params: {
//     action: string;
//     metadata?: AuditMetadata;
//     actorId?: string | null;
//   }) {
//     const { action, metadata, actorId } = params;

//     try {
//       await prisma.auditLog.create({
//         data: {
//           action,
//           metadata: metadata ?? {},
//           actorId: actorId ?? null,
//         },
//       });
//     } catch (error) {
//       console.error("Audit log error:", error);
//     }
//   },
// };


import { prisma } from "@/lib/db/prisma";
import type { AuditAction } from "./auditActions";
import type { EventType } from "./eventTypes";

interface AuditMetadata {
  [key: string]: any;
}

export const auditService = {
  async record(params: {
    eventType: EventType;
    action: AuditAction;
    metadata?: AuditMetadata;
    actorId?: string | null;
    ip?: string | null;
    userAgent?: string | null;
  }) {
    const { eventType, action, metadata, actorId, ip, userAgent } = params;

    try {
      await prisma.auditLog.create({
        data: {
          eventType,
          action,
          metadata: metadata ?? {},
          actorId: actorId ?? null,
          ip: ip ?? null,
          userAgent: userAgent ?? null,
        },
      });
    } catch (error) {
      console.error("Audit log error:", error);
    }
  },
};