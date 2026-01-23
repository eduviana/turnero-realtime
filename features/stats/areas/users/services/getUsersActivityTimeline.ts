import { db } from "@/lib/db/prisma";


type Granularity = "day" | "week" | "month";

function formatDate(date: Date, granularity: Granularity) {
  if (granularity === "day") {
    return date.toISOString().slice(0, 10);
  }

  if (granularity === "week") {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return d.toISOString().slice(0, 10);
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getRange(granularity: Granularity): Date[] {
  const now = new Date();
  const dates: Date[] = [];

  if (granularity === "day") {
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      dates.push(d);
    }
  }

  if (granularity === "week") {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i * 7);
      dates.push(d);
    }
  }

  if (granularity === "month") {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(now.getMonth() - i);
      dates.push(d);
    }
  }

  return dates;
}

export async function getUsersActivityTimeline(
  granularity: Granularity
) {
  const fromDate = getRange(granularity)[0];

  const statuses = await db.userStatus.findMany({
    where: {
      lastActivityAt: {
        gte: fromDate,
      },
    },
    select: {
      userId: true,
      lastActivityAt: true,
    },
  });

  const activityMap = new Map<string, Set<string>>();

  for (const status of statuses) {
    if (!status.lastActivityAt) continue;

    const key = formatDate(status.lastActivityAt, granularity);

    if (!activityMap.has(key)) {
      activityMap.set(key, new Set());
    }

    activityMap.get(key)!.add(status.userId);
  }

  return getRange(granularity).map((date) => {
    const key = formatDate(date, granularity);
    return {
      date: key,
      activeUsers: activityMap.get(key)?.size ?? 0,
    };
  });
}
