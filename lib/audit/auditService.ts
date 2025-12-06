import { prisma } from "@/lib/db/prisma";

interface AuditMetadata {
  [key: string]: any;
}

export const auditService = {
  async record(params: {
    action: string;
    metadata?: AuditMetadata;
    actorId?: string | null;
  }) {
    const { action, metadata, actorId } = params;

    try {
      await prisma.auditLog.create({
        data: {
          action,
          metadata: metadata ?? {},
          actorId: actorId ?? null,
        },
      });
    } catch (error) {
      console.error("Audit log error:", error);
    }
  },
};