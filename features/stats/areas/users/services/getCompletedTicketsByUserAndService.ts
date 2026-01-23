import { db } from "@/lib/db/prisma";


export type UsersCompletedTicketsByService = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  completedTickets: number;
};

export async function getCompletedTicketsByUserAndService(
  serviceId: string
): Promise<UsersCompletedTicketsByService[]> {
  const users = await db.user.findMany({
    where: {
      services: {
        some: {
          serviceId,
          isActive: true,
        },
      },
      deletedAt: null,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      ticketsHandled: {
        where: {
          serviceId,
          status: "COMPLETED",
        },
        select: {
          id: true,
        },
      },
    },
  });

  return users.map((user) => ({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    completedTickets: user.ticketsHandled.length,
  }));
}