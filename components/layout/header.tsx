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
import { UserButton } from "@clerk/nextjs";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white p-4 md:px-6">
      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="flex h-16 items-center px-6 border-b">
            <SheetTitle className="text-xl font-semibold">
              Dashboard
            </SheetTitle>
          </SheetHeader>

          <aside className="flex h-full flex-col bg-white">
            <nav className="flex flex-col p-4 gap-2">
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
              >
                Inicio
              </a>

              <a
                href="/events"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
              >
                Eventos
              </a>
            </nav>
          </aside>
        </SheetContent>
      </Sheet>

      {/* Title */}
      <h2 className="text-lg font-medium">Panel de control</h2>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-slate-600" />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}