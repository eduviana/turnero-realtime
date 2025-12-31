import { ROLE_PERMISSIONS } from "@/lib/roles/role-permissions";
import { useAuthContext } from "@/features/auth/AuthContext";

export function usePermissions() {
  const { role } = useAuthContext();
  return ROLE_PERMISSIONS[role];
}