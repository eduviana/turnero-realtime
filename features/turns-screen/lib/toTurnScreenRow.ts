// import { TurnScreenRow } from "../types/turnScreen";

// type TicketWithRelations = {
//   id: string;
//   code: string;
//   affiliate: {
//     firstName: string;
//     lastName: string;
//   } | null;
//   service: {
//     code: string;
//   };
// };

// export function toTurnScreenRow(
//   ticket: TicketWithRelations
// ): TurnScreenRow {
//   return {
//     ticketId: ticket.id,
//     ticketCode: ticket.code,
//     fullName: ticket.affiliate
//       ? `${ticket.affiliate.firstName} ${ticket.affiliate.lastName}`
//       : "—",
//     serviceCode: ticket.service.code,
//   };
// }



// import { Ticket, TicketStatus } from "@prisma/client";
import { TicketStatus } from "@/generated/prisma/enums";
import { TurnScreenRow } from "../types/TurnScreenState";

export function toTurnScreenRow(ticket: any): TurnScreenRow {
  return {
    ticketId: ticket.id,
    fullName: ticket.affiliate
      ? `${ticket.affiliate.firstName} ${ticket.affiliate.lastName}`
      : "—",
    ticketCode: ticket.code,
    isActive: ticket.status === TicketStatus.IN_PROGRESS,
  };
}