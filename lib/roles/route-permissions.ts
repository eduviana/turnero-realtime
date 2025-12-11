import { ROLE_HIERARCHY } from "./role-hierarchy";

// Este archivo define qué rol mínimo se necesita para acceder a un prefijo de ruta.
export const ROUTE_PERMISSIONS: Record<string, keyof typeof ROLE_HIERARCHY> = {
  "/admin": "ADMIN",
  "/supervisor": "SUPERVISOR",
  "/operator": "OPERATOR",
};