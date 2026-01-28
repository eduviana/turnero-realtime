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
              "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
              "border-r-4 border-transparent",
              isActive
                ? "bg-sidebar-accent text-sidebar-primary border-sidebar-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
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