// import { Role } from "@/generated/prisma/enums";

// export const DASHBOARD_ROUTES: Record<Role, Array<{ label: string; href: string }>> = {
//   ADMIN: [
//     { label: "Inicio", href: "/admin/dashboard" },
//     { label: "Usuarios", href: "/admin/usuarios" },
//     { label: "Servicios", href: "/admin/servicios" },
//     { label: "Afiliados", href: "/admin/afiliados" },
//     { label: "Auditoría", href: "/admin/auditorias" },
//     { label: "Estadísticas", href: "/admin/estadisticas" },
//   ],

//   SUPERVISOR: [
//     { label: "Inicio", href: "/supervisor/dashboard" },
//     { label: "Usuarios", href: "/supervisor/usuarios" },
//     { label: "Servicios", href: "/supervisor/servicios" },
//     { label: "Afiliados", href: "/supervisor/afiliados" },
//     { label: "Auditoría", href: "/supervisor/auditorias" },
//   ],

//   OPERATOR: [
//     { label: "Inicio", href: "/operator/dashboard" },
//   ],
// };

import { LucideIcon } from "lucide-react";

export type DashboardRoute = {
  label: string;
  href: string;
  icon: LucideIcon;
};

import { Role } from "@/generated/prisma/enums";
import {
  Home,
  Users,
  Stethoscope,
  BadgeCheck,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export const DASHBOARD_ROUTES: Record<Role, DashboardRoute[]> = {
  ADMIN: [
    {
      label: "Inicio",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      label: "Usuarios",
      href: "/admin/usuarios",
      icon: Users,
    },
    {
      label: "Servicios",
      href: "/admin/servicios",
      icon: Stethoscope,
    },
    {
      label: "Afiliados",
      href: "/admin/afiliados",
      icon: BadgeCheck,
    },
    {
      label: "Auditoría",
      href: "/admin/auditorias",
      icon: ShieldCheck,
    },
    {
      label: "Estadísticas",
      href: "/admin/estadisticas",
      icon: BarChart3,
    },
  ],

  SUPERVISOR: [
    {
      label: "Inicio",
      href: "/supervisor/dashboard",
      icon: Home,
    },
    {
      label: "Usuarios",
      href: "/supervisor/usuarios",
      icon: Users,
    },
    {
      label: "Servicios",
      href: "/supervisor/servicios",
      icon: Stethoscope,
    },
    {
      label: "Afiliados",
      href: "/supervisor/afiliados",
      icon: BadgeCheck,
    },
    {
      label: "Auditoría",
      href: "/supervisor/auditorias",
      icon: ShieldCheck,
    },
  ],

  OPERATOR: [
    {
      label: "Inicio",
      href: "/operator/dashboard",
      icon: Home,
    },
  ],
};
