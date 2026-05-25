import { RoleLinks } from "@/components/layout/RoleLinks";
import { Role } from "@/generated/prisma/enums";

interface SidebarProps {
  accountRole: Role;
}

export function Sidebar({ accountRole }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shrink-0">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-sidebar-primary font-black text-xl tracking-tighter italic">
          Medical-Healt
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <RoleLinks role={accountRole} />
      </nav>
    </aside>
  );
}