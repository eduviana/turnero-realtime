"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function AffiliateEditSkeleton() {
  return (
    <div className="flex flex-col gap-2 px-4 py-4 pb-8 w-full">
      {/* Header */}
      <div className="bg-foreground px-6 py-6 rounded-t-lg">
        <Skeleton className="w-40 h-6 bg-slate-600" />
      </div>

      {/* Sección 1 — Datos personales */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/40 px-6 py-6 backdrop-blur-[1px]">
        <Skeleton className="w-36 h-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-full h-9 rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* Sección 2 — Ubicación */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/35 px-6 py-6 backdrop-blur-[1px]">
        <Skeleton className="w-28 h-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-full h-9 rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* Sección 3 — Estado administrativo */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/30 px-6 py-6 backdrop-blur-[1px]">
        <Skeleton className="w-44 h-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-full h-9 rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* Sección 4 — Acciones */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/30 px-6 py-5 backdrop-blur-[1px]">
        <div className="flex justify-end gap-3">
          <Skeleton className="w-24 h-9 rounded-md" />
          <Skeleton className="w-36 h-9 rounded-md" />
        </div>
      </section>
    </div>
  );
}
