import { AuditEventType } from "@/generated/prisma/client";

export type AuditsByEventTypeStat = {
  eventType: AuditEventType;
  total: number;
};

export type AuditsOverTimeStat = {
  date: string; // YYYY-MM-DD
  total: number;
};


export type AuditsByActionStat = {
  action: string;
  total: number;
};