// import { db } from "@/lib/db/prisma";



// export type CompletedTicketsByService = {
//   serviceId: string;
//   serviceName: string;
//   completedTickets: number;
// };

// export async function getCompletedTicketsByService(): Promise<
//   CompletedTicketsByService[]
// > {
//   const services = await db.service.findMany({
//     where: {
//       isActive: true,
//     },
//     select: {
//       id: true,
//       name: true,
//       tickets: {
//         where: {
//           status: "COMPLETED",
//         },
//         select: {
//           id: true,
//         },
//       },
//     },
//   });

//   return services.map((service) => ({
//     serviceId: service.id,
//     serviceName: service.name,
//     completedTickets: service.tickets.length,
//   }));
// }



import { db } from "@/lib/db/prisma";
import { TicketsByServiceMetric } from "../types/types";
import { TicketStatus } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

export async function getTicketsByService(
  metric: TicketsByServiceMetric
) {
  let ticketsWhere: Prisma.TicketWhereInput | undefined;

  if (metric !== "total") {
    ticketsWhere = {
      status:
        metric === "completed"
          ? TicketStatus.COMPLETED
          : metric === "cancelled"
          ? TicketStatus.CANCELLED
          : TicketStatus.NO_SHOW,
    };
  }

  const data = await db.service.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      tickets: {
        where: ticketsWhere,
        select: {
          id: true,
        },
      },
    },
  });

  return data.map((service) => ({
    service: service.name,
    value: service.tickets.length,
  }));
}