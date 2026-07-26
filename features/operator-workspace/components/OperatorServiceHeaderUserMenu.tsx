"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { useOperatorService } from "../hooks/useOperatorService";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function OperatorServiceHeaderUserMenu() {
  const { operator } = useOperatorService();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-4 focus:outline-none">
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

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-foreground hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
