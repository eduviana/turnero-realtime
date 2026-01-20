import { db } from "@/lib/db/prisma";

interface OperatorsActivityPoint {
  date: string; // YYYY-MM-DD
  activeOperators: number;
}

const DAYS = 30;
const ACTIVE_WINDOW_HOURS = 24;

export async function getOperatorsActivityTimeline(): Promise<OperatorsActivityPoint[]> {
  const now = new Date();

  const startDate = new Date();
  startDate.setDate(now.getDate() - DAYS + 1);
  startDate.setHours(0, 0, 0, 0);

  // Traemos SOLO operadores con actividad
  const users = await db.user.findMany({
    where: {
      role: "OPERATOR",
      deletedAt: null,
      userStatus: {
        lastActivityAt: {
          not: null,
        },
      },
    },
    select: {
      userStatus: {
        select: {
          lastActivityAt: true,
        },
      },
    },
  });

  const timeline: OperatorsActivityPoint[] = [];

  for (let i = 0; i < DAYS; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);

    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);

    const activeSince = new Date(dayEnd);
    activeSince.setHours(dayEnd.getHours() - ACTIVE_WINDOW_HOURS);

    const activeOperators = users.filter((u) => {
      const last = u.userStatus?.lastActivityAt;
      if (!last) return false;
      return last >= activeSince && last <= dayEnd;
    }).length;

    timeline.push({
      date: day.toISOString().slice(0, 10),
      activeOperators,
    });
  }

  return timeline;
}