"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AffiliateViewSkeleton() {
  return (
    <div className="space-y-6 w-full">
      {/* HEADER CARD */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-56 h-6" />
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-32 h-4 mt-1" />
          </div>

          <Skeleton className="w-32 h-10 rounded-md" />
        </CardContent>
      </Card>

      {/* DATOS PERSONALES */}
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="w-36 h-4" />
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </CardContent>
      </Card>

      {/* UBICACIÓN */}
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="w-28 h-4" />
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </CardContent>
      </Card>

      {/* ESTADO ADMINISTRATIVO */}
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="w-44 h-4" />
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-full h-4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-32 h-4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-36 h-4" />
            <Skeleton className="w-32 h-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}