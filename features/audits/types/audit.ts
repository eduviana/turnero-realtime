// export type AuditLogRow = {
//   id: string;
//   eventType: string;
//   action: string;
//   metadata: any | null;
//   ip: string | null;
//   createdAt: string;
//   actor?: {
//     id: string;
//     email: string;
//   } | null;
// };



import {
  AuditAction,
  AuditEventType,
} from "@/generated/prisma/client";

export type AuditLogRow = {
  id: string;
  createdAt: string;

  eventType: AuditEventType;
  action: AuditAction;

  actorEmail: string | null;
  ip: string | null;

  summary: string;

  // SOLO para modal / debug
  metadata?: Record<string, unknown> | null;
};