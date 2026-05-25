"use client";

import { useState } from "react";
import { Bell, Menu, LogOut, User } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/features/auth/AuthContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

  return (
    <header className="flex h-16 items-center justify-end border-b border-border bg-white px-4 md:px-8 gap-6 shrink-0">
      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 md:hidden text-muted-foreground hover:text-foreground transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-64 p-0 bg-sidebar text-sidebar-foreground"
        >
          <SheetHeader className="p-6 flex items-center">
            <SheetTitle className="text-sm font-semibold tracking-widest text-sidebar-primary italic">
              DASHBOARD
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col p-4 gap-1">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              Inicio
            </a>

            <a
              href="/events"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              Eventos
            </a>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Notifications */}
      <div className="relative">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive border-2 border-white" />
      </div>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 focus:outline-none">
            <div className="flex flex-col leading-tight text-right">
              <span className="text-sm font-bold text-gray-800">
                {[user.firstName, user.lastName].filter(Boolean).join(" ")}
              </span>
              <span className="text-xs text-gray-400 capitalize">
                {user.role.toLowerCase()}
              </span>
            </div>

            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user.profileImage ?? undefined}
                alt={`${user.firstName ?? ""} ${user.lastName ?? ""}`}
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
            className="cursor-pointer text-foreground hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
