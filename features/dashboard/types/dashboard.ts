import type { TicketStatus } from "@/generated/prisma/enums";

export interface DashboardUsersStats {
  total: number;
  active: number;
  away: number;
  inactive: number;
}

export interface DashboardServicesStats {
  total: number;
  active: number;
  inactive: number;
}

export interface DashboardAffiliatesStats {
  total: number;
  active: number;
  suspended: number;
  inactive: number;
}

export interface DashboardTicketStats {
  todayTotal: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}

export interface RecentTicketItem {
  id: string;
  code: string;
  status: TicketStatus;
  serviceName: string;
  affiliateName: string | null;
  createdAt: Date;
}

export interface TicketsByServiceItem {
  serviceName: string;
  serviceCode: string;
  count: number;
}
