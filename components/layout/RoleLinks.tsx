import { Role } from "@/generated/prisma/enums";
import { DASHBOARD_ROUTES } from "../../lib/role-routes";
import Link from "next/link";


export function RoleLinks({ role }: { role: Role }) {
  const routes = DASHBOARD_ROUTES[role];

  return (
    <>
      {routes.map((r) => (
        <Link key={r.href} href={r.href}>
          {r.label}
        </Link>
      ))}
    </>
  );
}