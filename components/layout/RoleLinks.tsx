"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Role } from "@/generated/prisma/enums";
import { DASHBOARD_ROUTES } from "@/lib/role-routes";
import clsx from "clsx";

export function RoleLinks({ role }: { role: Role }) {
  const pathname = usePathname();
  const routes = DASHBOARD_ROUTES[role];

  return (
    <>
      {routes.map((route) => {
        const isActive = pathname.startsWith(route.href);
        const Icon = route.icon;

        return (
          <Link
            key={route.href}
            href={route.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 text-sm transition-colors",
              isActive
                ? "text-sidebar-primary bg-sidebar-accent rounded-md font-semibold"
                : "text-sidebar-foreground hover:text-white"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{route.label}</span>
          </Link>
        );
      })}
    </>
  );
}