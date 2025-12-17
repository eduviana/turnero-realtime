"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AffiliateEditSkeleton() {
  return (
    <Card className={"overflow-hidden w-full"}>
      {/* Header */}
      <CardHeader className="flex flex-col items-center gap-4 p-6 bg-muted/30 border-b">
        {/* Avatar */}
        <Skeleton className="w-24 h-24 rounded-full" />

        {/* Name + Role */}
        <div className="text-center flex flex-col items-center gap-2">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-20 h-4" />
        </div>
      </CardHeader>

      {/* Body */}
      <CardContent className="p-6 space-y-6">
        {/* Email */}
        <div className="space-y-1">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-4" />
        </div>

        {/* Nombre + Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-4" />
          </div>

          <div className="space-y-1">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-32 h-4" />
          </div>

          <div className="space-y-1">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
