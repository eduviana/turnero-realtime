


import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DashboardAffiliatesStats } from "../types/dashboard";

interface AffiliatesSummaryCardProps {
  stats: DashboardAffiliatesStats;
}

export function AffiliatesSummaryCard({ stats }: AffiliatesSummaryCardProps) {
  return (
    <Card className="flex flex-col justify-between p-0 gap-0">
      {/* Header */}
      <CardHeader className="p-3 gap-0 bg-primary rounded-t-md">
        <h3 className="text-lg text-center font-medium text-secondary">
          Afiliados
        </h3>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-4 p-4 pb-0">
        {/* Resumen principal */}
        <div className="text-center">
          <p className="text-3xl font-semibold leading-none">
            {stats.total}
          </p>
          <p className="text-sm text-muted-foreground">
            Afiliados registrados
          </p>
        </div>

        {/* Estados */}
        <div className="flex justify-center flex-wrap gap-3">
          <Badge className="bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
            Activos {stats.active}
          </Badge>

          <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
            Suspendidos {stats.suspended}
          </Badge>

          <Badge className="bg-red-700/10 text-red-700 dark:text-red-400">
            Inactivos {stats.inactive}
          </Badge>
        </div>

        {/* Acción */}
        <div className="flex justify-end border-t py-1">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/afiliados">Ver más</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}