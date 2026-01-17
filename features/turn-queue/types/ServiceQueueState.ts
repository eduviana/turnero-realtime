import type { TicketStatus } from "@/generated/prisma/enums";

export interface QueueTicket {
  id: string;
  number: number;
  code: string;
  status: TicketStatus;
  serviceCode?: string;
}

export interface ServiceQueueState {
  currentTicket: QueueTicket | null;
  lastCalledTickets: QueueTicket[];
  pendingCount: number;
}