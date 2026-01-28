// import { db } from "@/lib/db/prisma";
// import { TurnScreenState } from "../types/TurnScreenState";

// const HISTORY_LIMIT = 5;

// export async function getTurnScreenState(
//   serviceId: string,
// ): Promise<TurnScreenState> {
//   // 🎯 Turno actual (el que está en pantalla grande)
//   const currentTicket = await db.ticket.findFirst({
//     where: {
//       serviceId,
//       OR: [{ status: "CALLED" }, { status: "IN_PROGRESS" }],
//     },
//     orderBy: [{ status: "asc" }, { calledAt: "desc" }],
//     select: {
//       id: true,
//       code: true,
//       status: true,
//       affiliate: {
//         select: {
//           firstName: true,
//           lastName: true,
//         },
//       },
//     },
//   });

//   // 📜 Historial (excluye el actual)
//   const historyTickets = await db.ticket.findMany({
//     where: {
//       serviceId,
//       status: {
//         in: ["CALLED", "IN_PROGRESS", "COMPLETED"],
//       },
//       ...(currentTicket && {
//         id: { not: currentTicket.id },
//       }),
//     },
//     orderBy: {
//       calledAt: "desc",
//     },
//     take: HISTORY_LIMIT,
//     select: {
//       id: true,
//       code: true,
//       status: true,
//       affiliate: {
//         select: {
//           firstName: true,
//           lastName: true,
//         },
//       },
//     },
//   });

//   return {
//     current: currentTicket
//       ? {
//           id: currentTicket.id,
//           code: currentTicket.code,
//           status: currentTicket.status,
//           affiliateName: currentTicket.affiliate
//             ? `${currentTicket.affiliate.firstName} ${currentTicket.affiliate.lastName}`
//             : "—",
//         }
//       : null,

//     history: historyTickets.map((ticket) => ({
//       id: ticket.id,
//       code: ticket.code,
//       status: ticket.status,
//       affiliateName: ticket.affiliate
//         ? `${ticket.affiliate.firstName} ${ticket.affiliate.lastName}`
//         : "—",
//     })),
//   };
// }





import { db } from "@/lib/db/prisma";
import { TurnScreenState } from "../types/TurnScreenState";

const HISTORY_LIMIT = 5;

export async function getTurnScreenState(): Promise<TurnScreenState> {
  // 🎯 Turno actual GLOBAL
  const currentTicket = await db.ticket.findFirst({
    where: {
      OR: [{ status: "CALLED" }, { status: "IN_PROGRESS" }],
    },
    orderBy: [
      { status: "asc" },      // IN_PROGRESS antes que CALLED si aplica
      { calledAt: "desc" },
    ],
    select: {
      id: true,
      code: true,
      status: true,
      service: {
        select: {
          name: true,
        },
      },
      affiliate: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  // 📜 Historial GLOBAL
  const historyTickets = await db.ticket.findMany({
    where: {
      status: {
        in: ["CALLED", "IN_PROGRESS", "COMPLETED"],
      },
      ...(currentTicket && {
        id: { not: currentTicket.id },
      }),
    },
    orderBy: {
      calledAt: "desc",
    },
    take: HISTORY_LIMIT,
    select: {
      id: true,
      code: true,
      status: true,
      service: {
        select: {
          name: true,
        },
      },
      affiliate: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    current: currentTicket
      ? {
          id: currentTicket.id,
          code: currentTicket.code,
          status: currentTicket.status,
          serviceName: currentTicket.service.name,
          affiliateName: currentTicket.affiliate
            ? `${currentTicket.affiliate.firstName} ${currentTicket.affiliate.lastName}`
            : "—",
        }
      : null,

    history: historyTickets.map((ticket) => ({
      id: ticket.id,
      code: ticket.code,
      status: ticket.status,
      serviceName: ticket.service.name,
      affiliateName: ticket.affiliate
        ? `${ticket.affiliate.firstName} ${ticket.affiliate.lastName}`
        : "—",
    })),
  };
}