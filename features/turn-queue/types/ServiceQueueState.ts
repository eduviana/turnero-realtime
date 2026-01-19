import type { TicketStatus } from "@/generated/prisma/enums";

export interface QueueTicket {
  id: string;
  number: number;
  code: string;
  status: TicketStatus;
  serviceCode?: string;
}

export interface ActiveQueueTicket extends QueueTicket {
  calledAt: string | null;
  startedAt: string | null;
}

export interface ServiceQueueState {
  currentTicket: ActiveQueueTicket | null;
  lastCalledTickets: QueueTicket[];
  pendingCount: number;
}