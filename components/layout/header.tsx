"use client";

import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SignOutButton } from "./SignOutButton";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-8 ">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 md:hidden text-muted-foreground hover:text-foreground transition-colors ">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 p-0 bg-sidebar text-sidebar-foreground"
          >
            <SheetHeader className="h-16 px-6 flex items-center border-b border-sidebar-border">
              <SheetTitle className="text-sm font-semibold tracking-widest text-sidebar-primary">
                DASHBOARD
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col p-4 gap-1">
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors "
              >
                Inicio
              </a>

              <a
                href="/events"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors "
              >
                Eventos
              </a>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Title */}
        <h2 className="text-lg font-semibold text-foreground">
          Panel de control
        </h2>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-muted-foreground hover:text-primary transition-colors ">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive ring-2 ring-background " />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* Logout */}
        <SignOutButton />
      </div>
    </header>
  );
}
