import { RoleLinks } from "@/components/layout/RoleLinks";
import { Role } from "@/generated/prisma/enums";

interface SidebarProps {
  accountRole: Role;
}

export function Sidebar({ accountRole }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="flex items-center h-16 gap-2 px-6 border-b border-sidebar-border">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <span className="text-sidebar-primary font-black tracking-tighter">
            DASHBOARD
          </span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 mt-8">
        <RoleLinks role={accountRole} />
      </nav>
    </aside>
  );
}