"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function AffiliateViewSkeleton() {
  return (
    <div className="flex flex-col gap-2 px-4 py-4 pb-8 w-full">
      {/* Sección 1 — Perfil */}
      <section className="flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white/40 px-6 py-8 text-center backdrop-blur-[1px] md:flex-row md:justify-between md:text-left gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-56 h-6" />
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <Skeleton className="w-24 h-6 rounded" />
      </section>

      {/* Sección 2 — Datos personales */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/35 px-6 py-6 backdrop-blur-[1px]">
        <Skeleton className="w-36 h-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-full h-5" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-full h-5" />
          </div>
        </div>
      </section>

      {/* Sección 3 — Ubicación */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/30 px-6 py-6 backdrop-blur-[1px]">
        <Skeleton className="w-28 h-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-full h-5" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-full h-5" />
          </div>
        </div>
      </section>

      {/* Sección 4 — Estado administrativo */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/30 px-6 py-6 backdrop-blur-[1px]">
        <Skeleton className="w-44 h-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-full h-5" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
