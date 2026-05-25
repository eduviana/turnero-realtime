"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  className?: string;
}

export function UserViewSkeleton({ className = "" }: Props) {
  return (
    <div className={`${className}`}>
      {/* Sección 1 — Perfil */}
      <div className="px-6 pt-2 pb-6 flex flex-col items-center gap-3">
        <Skeleton className="w-28 h-28 rounded-full" />
        <Skeleton className="w-40 h-6" />
        <Skeleton className="w-48 h-4" />
        <Skeleton className="w-24 h-6 rounded" />
      </div>

      {/* Sección 2 — Áreas */}
      <div className="px-6 py-6 bg-[#f0f4f8] border-y border-slate-200/60 text-center">
        <Skeleton className="w-32 h-3 mx-auto mb-3" />
        <div className="flex justify-center gap-2">
          <Skeleton className="w-16 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
        </div>
      </div>

      {/* Sección 3 — Info */}
      <div className="px-6 py-6 grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center flex flex-col items-center gap-2">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-24 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
