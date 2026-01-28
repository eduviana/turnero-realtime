import { AffiliateStatus, AffiliateStatusReason } from "@/generated/prisma/enums";
import { db } from "@/lib/db/prisma";

const REASON_LABELS: Record<AffiliateStatusReason, string> = {
  NONE: "Sin motivo",
  DEBT: "Deuda",
  MISSING_DOCUMENTATION: "Documentación incompleta",
  VOLUNTARY_LEAVE: "Baja voluntaria",
  ADMIN_DECISION: "Decisión administrativa",
};

export type SuspendedByReasonData = {
  reason: AffiliateStatusReason;
  label: string;
  total: number;
};

export async function getSuspendedAffiliatesByReason(): Promise<
  SuspendedByReasonData[]
> {
  const result = await db.affiliate.groupBy({
    by: ["statusReason"],
    where: {
      status: AffiliateStatus.SUSPENDED,
      deletedAt: null,
      statusReason: {
        not: AffiliateStatusReason.NONE,
      },
    },
    _count: {
      _all: true,
    },
  });

  return result
    .map((r) => ({
      reason: r.statusReason,
      label: REASON_LABELS[r.statusReason],
      total: r._count._all,
    }))
    .filter((r) => r.total > 0);
}