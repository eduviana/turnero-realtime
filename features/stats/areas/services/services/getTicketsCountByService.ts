// import { db } from "@/lib/db/prisma";

// export type TicketsByService = {
//   serviceId: string;
//   serviceName: string;
//   totalTickets: number;
// };

// export async function getTicketsCountByService(): Promise<
//   TicketsByService[]
// > {
//   const services = await db.service.findMany({
//     where: {
//       isActive: true,
//     },
//     select: {
//       id: true,
//       name: true,
//       tickets: {
//         select: {
//           id: true,
//         },
//       },
//     },
//   });

//   return services.map((service) => ({
//     serviceId: service.id,
//     serviceName: service.name,
//     totalTickets: service.tickets.length,
//   }));
// }