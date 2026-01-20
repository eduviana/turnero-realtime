import { Role } from "@/generated/prisma/enums";

export const DASHBOARD_ROUTES: Record<Role, Array<{ label: string; href: string }>> = {
  ADMIN: [
    { label: "Inicio", href: "/admin/dashboard" },
    { label: "Usuarios", href: "/admin/usuarios" },
    { label: "Servicios", href: "/admin/servicios" },
    { label: "Afiliados", href: "/admin/afiliados" },
    { label: "Auditoría", href: "/admin/auditorias" },
    { label: "Estadísticas", href: "/admin/estadisticas" },
  ],

  SUPERVISOR: [
    { label: "Inicio", href: "/supervisor/dashboard" },
    { label: "Usuarios", href: "/supervisor/usuarios" },
    { label: "Servicios", href: "/supervisor/servicios" },
    { label: "Afiliados", href: "/supervisor/afiliados" },
    { label: "Auditoría", href: "/supervisor/auditorias" },
  ],

  OPERATOR: [
    { label: "Inicio", href: "/operator/dashboard" },
  ],
};