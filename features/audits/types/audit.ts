export type AuditLogRow = {
  id: string;
  eventType: string;
  action: string;
  metadata: any | null;
  ip: string | null;
  createdAt: string;
  actor?: {
    id: string;
    email: string;
  } | null;
};