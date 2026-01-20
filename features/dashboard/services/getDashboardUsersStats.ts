import { db } from "@/lib/db/prisma";
import { DashboardUsersStats } from "../types/dashboard";
import {
  calculateUserPresence,
  UserPresenceStatus,
} from "@/lib/userPresence";

export async function getDashboardUsersStats(): Promise<DashboardUsersStats> {
  const users = await db.user.findMany({
    where: { 
      deletedAt: null,
      role: "OPERATOR",
    },
    select: {
      id: true,
      userStatus: {
        select: {
          lastActivityAt: true,
        },
      },
    },
  });

  let active = 0;
  let away = 0;
  let inactive = 0;

  for (const user of users) {
    const presence = calculateUserPresence(
      user.userStatus?.lastActivityAt
    );

    switch (presence.status) {
      case UserPresenceStatus.ACTIVE:
        active++;
        break;

      case UserPresenceStatus.AWAY:
        away++;
        break;

      case UserPresenceStatus.INACTIVE:
        inactive++;
        break;
    }
  }

  return {
    total: users.length,
    active,
    away,
    inactive,
  };
}