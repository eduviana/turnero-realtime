import { db } from "@/lib/db/prisma";
import type { DashboardAffiliatesStats } from "../types/dashboard";
import { AffiliateStatus } from "@/generated/prisma/enums";


export async function getDashboardAffiliatesStats(): Promise<DashboardAffiliatesStats> {
  const [total, active, suspended] = await Promise.all([
    db.affiliate.count({
      where: { deletedAt: null },
    }),
    db.affiliate.count({
      where: {
        status: AffiliateStatus.ACTIVE,
        deletedAt: null,
      },
    }),
    db.affiliate.count({
      where: {
        status: AffiliateStatus.SUSPENDED,
        deletedAt: null,
      },
    }),
  ]);

  return {
    total,
    active,
    suspended,
    inactive: total - active - suspended,
  };
}