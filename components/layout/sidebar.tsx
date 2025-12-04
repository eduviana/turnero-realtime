"use client";

import Link from "next/link";

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center px-6 border-b">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <nav className="flex flex-col p-4 gap-2">
          <Link href="/" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">Inicio</Link>
          <Link href="/events" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">Eventos</Link>
        </nav>
      </aside>
    </>
  );
}