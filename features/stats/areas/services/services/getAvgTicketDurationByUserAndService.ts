import { TicketStatus } from "@/generated/prisma/enums";
import { db } from "@/lib/db/prisma";

export type AvgTicketDurationByUser = {
  userId: string;
  userName: string;
  avgMinutes: number;
};

/**
 * Devuelve el tiempo promedio de atención por usuario
 * para un servicio dado, en minutos.
 */
export async function getAvgTicketDurationByUserAndService(
  serviceId: string
): Promise<AvgTicketDurationByUser[]> {
  const result = await db.ticket.groupBy({
    by: ["handledById"],
    where: {
      serviceId,
      status: TicketStatus.COMPLETED,
      handledById: { not: null },
      durationSeconds: { not: null, gt: 0 },
    },
    _avg: {
      durationSeconds: true,
    },
  });

  if (result.length === 0) return [];

  const users = await db.user.findMany({
    where: {
      id: {
        in: result.map((r) => r.handledById!),
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return result
    .map((r) => {
      const user = users.find((u) => u.id === r.handledById);
      if (!user || !r._avg.durationSeconds) return null;

      return {
        userId: user.id,
        userName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        avgMinutes: Number((r._avg.durationSeconds / 60).toFixed(2)),
      };
    })
    .filter((v): v is AvgTicketDurationByUser => v !== null) // 🔑 clave
    .sort((a, b) => a.avgMinutes - b.avgMinutes);
}