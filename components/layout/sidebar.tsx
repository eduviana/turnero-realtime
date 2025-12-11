

import { RoleLinks } from "@/features/dashboard/components/RoleLinks";
import { Role } from "@/generated/prisma/enums";


interface SidebarProps {
  accountRole: Role;
}

export function Sidebar({ accountRole }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center px-6 border-b">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <nav className="flex flex-col p-4 gap-2">
          <RoleLinks role={accountRole} />
        </nav>
      </aside>
    </>
  );
}


