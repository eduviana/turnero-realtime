import type { TicketStatus } from "@/generated/prisma/enums";

export interface TurnScreenTicket {
  id: string;
  code: string;
  status: TicketStatus;
  affiliateName: string;
  serviceName: string;
}

export interface TurnScreenState {
  current: TurnScreenTicket | null;
  history: TurnScreenTicket[];
}