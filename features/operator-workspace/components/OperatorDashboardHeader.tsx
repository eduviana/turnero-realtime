"use client";

import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  firstName: string | null;
  lastName: string | null;
  role: string;
  profileImage: string | null;
}

export function OperatorDashboardHeader({
  firstName,
  lastName,
  role,
  profileImage,
}: Props) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 focus:outline-none">
          <div className="flex flex-col leading-tight text-right">
            <span className="text-sm font-bold text-gray-800">{fullName}</span>
            <span className="text-xs text-gray-400 capitalize">
              {role.toLowerCase()}
            </span>
          </div>

          <Avatar className="h-10 w-10">
            <AvatarImage
              src={profileImage ?? undefined}
              alt={fullName}
              className="grayscale"
            />
            <AvatarFallback className="bg-gray-400 text-white text-xs">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
