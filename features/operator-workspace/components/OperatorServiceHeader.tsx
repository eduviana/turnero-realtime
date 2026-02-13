// "use client";

// import { BriefcaseMedical } from "lucide-react";
// import { useOperatorService } from "../hooks/useOperatorService";
// import { SignOutButton } from "@/components/layout/SignOutButton";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export function OperatorServiceHeader() {
//   const { operator, service } = useOperatorService();

//   return (
//     <header className="bg-blue-950">
//       <div className="container mx-auto flex justify-between p-6">
//         <div className="flex gap-2 items-center">
//           <BriefcaseMedical className="h-8 w-8 text-blue-400" />
//           <h1 className="text-white text-2xl font-bold">{service.name}</h1>
//         </div>

//         <div className="mt-1 flex items-center text-white">
//           <Avatar className="h-9 w-9 border border-white/20">
//             <AvatarImage
//               src={operator.profileImage ?? undefined}
//               alt={`${operator.firstName ?? ""} ${operator.lastName ?? ""}`}
//             />
//             <AvatarFallback className="bg-white/20 text-xs font-semibold text-white">
//               {operator.firstName?.[0]}
//               {operator.lastName?.[0]}
//             </AvatarFallback>
//           </Avatar>

//           <SignOutButton />
//         </div>
//       </div>
//     </header>
//   );
// }







"use client";

import { BriefcaseMedical, LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

import { useOperatorService } from "../hooks/useOperatorService";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function OperatorServiceHeader() {
  const { operator, service } = useOperatorService();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

  return (
    <header className="bg-blue-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* ───────────── Left / Service ───────────── */}
        <div className="flex gap-3 items-center">
          <BriefcaseMedical className="h-7 w-7 text-blue-400" />
          <h1 className="text-white text-xl font-bold">
            {service.name}
          </h1>
        </div>

        {/* ───────────── Right / User Menu ───────────── */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-4 focus:outline-none">
              {/* Nombre + Rol */}
              <div className="flex flex-col leading-tight text-right">
                <span className="text-sm font-bold text-white">
                  {[operator.firstName, operator.lastName]
                    .filter(Boolean)
                    .join(" ")}
                </span>
                <span className="text-xs font-medium text-blue-300 capitalize">
                  operator
                </span>
              </div>

              {/* Avatar */}
              <Avatar className="h-9 w-9 border border-white/20">
                <AvatarImage
                  src={operator.profileImage ?? undefined}
                  alt={`${operator.firstName ?? ""} ${operator.lastName ?? ""}`}
                />
                <AvatarFallback className="bg-white/20 text-xs font-semibold text-white">
                  {operator.firstName?.[0]}
                  {operator.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44"
          >
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-foreground hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}