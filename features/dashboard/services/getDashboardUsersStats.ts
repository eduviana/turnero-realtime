import { db } from "@/lib/db/prisma";
import { DashboardUsersStats } from "../types/dashboard";

export async function getDashboardUsersStats(): Promise<DashboardUsersStats> {
  const [total, online] = await Promise.all([
    db.user.count({
      where: { deletedAt: null },
    }),
    db.userStatus.count({
      where: { isOnline: true },
    }),
  ]);

  return {
    total,
    online,
    offline: total - online,
  };
}