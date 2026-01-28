import { AffiliateStatus } from "@/generated/prisma/enums";
import { db } from "@/lib/db/prisma";

const STATUS_LABELS: Record<AffiliateStatus, string> = {
  ACTIVE: "Activos",
  SUSPENDED: "Suspendidos",
  INACTIVE: "Inactivos",
};

export type AffiliatesByStatusData = {
  status: AffiliateStatus;
  label: string;
  total: number;
};

export async function getAffiliatesByStatus(): Promise<
  AffiliatesByStatusData[]
> {
  const result = await db.affiliate.groupBy({
    by: ["status"],
    where: {
      deletedAt: null,
    },
    _count: {
      _all: true,
    },
  });

  return result
    .map((r) => ({
      status: r.status,
      label: STATUS_LABELS[r.status],
      total: r._count._all,
    }))
    .filter((r) => r.total > 0);
}