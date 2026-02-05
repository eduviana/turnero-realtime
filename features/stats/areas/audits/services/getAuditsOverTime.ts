import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { AuditsOverTimeStat } from "../types/audit-stats";

export async function getAuditsOverTime(
  days = 30,
): Promise<AuditsOverTimeStat[]> {
  await requireRole("SUPERVISOR");

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const result = await prisma.$queryRaw<
    { date: string; total: number }[]
  >`
    SELECT
      DATE("createdAt") as date,
      COUNT(*)::int as total
    FROM "AuditLog"
    WHERE "createdAt" >= ${fromDate}
    GROUP BY DATE("createdAt")
    ORDER BY DATE("createdAt") ASC
  `;

  return result;
}