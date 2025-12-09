import { Role } from "@/generated/prisma/enums";

export const DASHBOARD_ROUTES: Record<Role, Array<{ label: string; href: string }>> = {
  ADMIN: [
    { label: "Usuarios", href: "/admin/users" },
    { label: "Servicios", href: "/admin/services" },
    { label: "Afiliados", href: "/admin/affiliates" },
    { label: "Reportes", href: "/admin/reports" },
    { label: "Auditoría", href: "/admin/audit-logs" },
    { label: "Configuración", href: "/admin/settings" },
  ],

  SUPERVISOR: [
    { label: "Panel de Tickets", href: "/supervisor/tickets" },
    { label: "Colas y Servicios", href: "/supervisor/services" },
    { label: "Operadores", href: "/supervisor/operators" },
    { label: "Estadísticas", href: "/supervisor/stats" },
    { label: "Vista en Vivo", href: "/supervisor/live" },
  ],

  OPERATOR: [
    { label: "Mis Tickets", href: "/operator/tickets" },
    { label: "Crear Ticket", href: "/operator/new-ticket" },
    { label: "Historial", href: "/operator/history" },
  ],
};