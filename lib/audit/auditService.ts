import {
  AuditAction,
  AuditEntity,
  AuditEventType,
  Prisma,
  Role,
} from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";

type AuditMetadata = Prisma.InputJsonValue;

interface RecordAuditParams {
  eventType: AuditEventType;
  action: AuditAction;
  entity: AuditEntity;
  entityId?: string | null;

  actorId?: string | null;
  actorRole?: Role | null;

  metadata?: AuditMetadata;

  ip?: string | null;
  userAgent?: string | null;
}

export const auditService = {
  async record(params: RecordAuditParams) {
    try {
      await prisma.auditLog.create({
        data: {
          eventType: params.eventType,
          action: params.action,
          entity: params.entity,
          entityId: params.entityId ?? null,

          actorId: params.actorId ?? null,
          actorRole: params.actorRole ?? null,

          metadata: params.metadata ?? {},

          ip: params.ip ?? null,
          userAgent: params.userAgent ?? null,
        },
      });
    } catch (error) {
      // Auditoría jamás debe romper el flujo principal
      console.error("[AUDIT_LOG_ERROR]", error);
    }
  },
};
