


import { db } from "@/lib/db/prisma";
import type { DashboardServicesStats } from "../types/dashboard";

export async function getDashboardServicesStats(): Promise<DashboardServicesStats> {
  const [total, active] = await Promise.all([
    db.service.count(),
    db.service.count({
      where: { isActive: true },
    }),
  ]);

  return {
    total,
    active,
    inactive: total - active,
  };
}