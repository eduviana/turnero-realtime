export interface Permissions {
  // Users
  canViewUsers: boolean;
  canEditUsers: boolean;
  canAssignServices: boolean;

  // Services
  canViewServices: boolean;
  canToggleServices: boolean;

  // Audits
  canViewAudits: boolean;

  // Dashboard
  canViewDashboard: boolean;
}

import { Role } from "@/generated/prisma/enums";

export const ROLE_PERMISSIONS: Record<Role, Permissions> = {
  ADMIN: {
    canViewUsers: true,
    canEditUsers: true,
    canAssignServices: true,

    canViewServices: true,
    canToggleServices: true,

    canViewAudits: true,
    canViewDashboard: true,
  },

  SUPERVISOR: {
    canViewUsers: true,
    canEditUsers: false,
    canAssignServices: false,

    canViewServices: true,
    canToggleServices: false,

    canViewAudits: true,
    canViewDashboard: true,
  },

  OPERATOR: {
    canViewUsers: false,
    canEditUsers: false,
    canAssignServices: false,

    canViewServices: false,
    canToggleServices: false,

    canViewAudits: false,
    canViewDashboard: false,
  },
};