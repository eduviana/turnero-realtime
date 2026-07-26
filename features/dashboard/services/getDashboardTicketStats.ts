import { db } from "@/lib/db/prisma";
import { TicketStatus } from "@/generated/prisma/enums";
import type {
  DashboardTicketStats,
  RecentTicketItem,
  TicketsByServiceItem,
} from "../types/dashboard";

function startOfDay(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getDashboardTicketStats(): Promise<DashboardTicketStats> {
  const today = startOfDay();

  const [todayTotal, pending, inProgress, completed, cancelled] =
    await Promise.all([
      db.ticket.count({
        where: { createdAt: { gte: today } },
      }),
      db.ticket.count({
        where: { status: TicketStatus.PENDING, createdAt: { gte: today } },
      }),
      db.ticket.count({
        where: { status: TicketStatus.IN_PROGRESS, createdAt: { gte: today } },
      }),
      db.ticket.count({
        where: { status: TicketStatus.COMPLETED, createdAt: { gte: today } },
      }),
      db.ticket.count({
        where: { status: TicketStatus.CANCELLED, createdAt: { gte: today } },
      }),
    ]);

  return { todayTotal, pending, inProgress, completed, cancelled };
}

export async function getRecentTickets(
  limit = 6,
): Promise<RecentTicketItem[]> {
  const tickets = await db.ticket.findMany({
    where: { createdAt: { gte: startOfDay() } },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      code: true,
      status: true,
      createdAt: true,
      service: { select: { name: true } },
      affiliate: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return tickets.map((t) => ({
    id: t.id,
    code: t.code,
    status: t.status as DashboardTicketStats extends never
      ? never
      : (typeof t)["status"],
    serviceName: t.service.name,
    affiliateName: t.affiliate
      ? `${t.affiliate.firstName} ${t.affiliate.lastName}`
      : null,
    createdAt: t.createdAt,
  }));
}

export async function getTicketsByServiceToday(): Promise<
  TicketsByServiceItem[]
> {
  const today = startOfDay();

  const services = await db.service.findMany({
    where: { isActive: true },
    select: {
      name: true,
      code: true,
      _count: {
        select: {
          tickets: {
            where: { createdAt: { gte: today } },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return services
    .map((s) => ({
      serviceName: s.name,
      serviceCode: s.code,
      count: s._count.tickets,
    }))
    .filter((s) => s.count > 0);
}
