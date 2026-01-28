import { db } from "@/lib/db/prisma";

export type AvgServiceAttentionTime = {
  service: string;
  avgMinutes: number;
};

export async function getAvgServiceAttentionTime(): Promise<
  AvgServiceAttentionTime[]
> {
  const services = await db.service.findMany({
    where: {
      isActive: true,
    },
    select: {
      name: true,
      tickets: {
        where: {
          status: "COMPLETED",
          durationSeconds: {
            not: null,
          },
        },
        select: {
          durationSeconds: true,
        },
      },
    },
  });

  return services.map((service) => {
    const durations = service.tickets
      .map((t) => t.durationSeconds!)
      .filter(Boolean);

    const avgSeconds =
      durations.length > 0
        ? durations.reduce((a, b) => a + b, 0) / durations.length
        : 0;

    return {
      service: service.name,
      avgMinutes: Math.round(avgSeconds / 60),
    };
  });
}