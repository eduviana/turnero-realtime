// import {
//   AuditAction,
//   AuditEntity,
//   AuditEventType,
// } from "@/generated/prisma/client";
// import { Prisma } from "@/generated/prisma/client";


// import { AuditLogRow } from "../types/audit";
// import { buildAuditSummary } from "./buildAuditSummary";

// type AuditLogWithActor = {
//   id: string;
//   eventType: AuditEventType;
//   action: AuditAction;
//   entity: AuditEntity;
//   metadata: Prisma.JsonValue | null;
//   ip: string | null;
//   createdAt: Date;
//   actor: {
//     email: string | null;
//   } | null;
// };


// export function mapAuditLogToRow(
//   log: AuditLogWithActor
// ): AuditLogRow {
//   return {
//     id: log.id,
//     createdAt: log.createdAt.toISOString(),

//     eventType: log.eventType,
//     action: log.action,

//     actorEmail: log.actor?.email ?? null,
//     ip: log.ip ?? null,

//     summary: buildAuditSummary({
//       action: log.action,
//       entity: log.entity,
//       metadata: normalizeMetadata(log.metadata),
//     }),

//     metadata: normalizeMetadata(log.metadata),
//   };
// }


// function normalizeMetadata(
//   metadata: Prisma.JsonValue | null
// ): Record<string, unknown> | null {
//   if (!metadata) return null;

//   if (typeof metadata === "object" && !Array.isArray(metadata)) {
//     return metadata as Record<string, unknown>;
//   }

//   return null;
// }



import {
  AuditAction,
  AuditEntity,
  AuditEventType,
} from "@/generated/prisma/client";
import { Prisma } from "@/generated/prisma/client";

import { AuditLogRow } from "../types/audit";
import { buildAuditSummary } from "./buildAuditSummary";

type AuditLogWithActor = {
  id: string;
  eventType: AuditEventType;
  action: AuditAction;
  entity: AuditEntity;
  metadata: Prisma.JsonValue | null;
  ip: string | null;
  createdAt: Date;
  actor: {
    email: string | null;
  } | null;
};

export function mapAuditLogToRow(
  log: AuditLogWithActor
): AuditLogRow {
  return {
    id: log.id,

    // ✅ FECHA FORMATEADA EN SERVER (evita hydration mismatch)
    createdAt: log.createdAt.toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    }),

    eventType: log.eventType,
    action: log.action,

    actorEmail: log.actor?.email ?? null,
    ip: log.ip ?? null,

    summary: buildAuditSummary({
      action: log.action,
      entity: log.entity,
      metadata: normalizeMetadata(log.metadata),
    }),

    metadata: normalizeMetadata(log.metadata),
  };
}

function normalizeMetadata(
  metadata: Prisma.JsonValue | null
): Record<string, unknown> | null {
  if (!metadata) return null;

  if (typeof metadata === "object" && !Array.isArray(metadata)) {
    return metadata as Record<string, unknown>;
  }

  return null;
}