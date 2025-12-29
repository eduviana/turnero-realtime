import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardUsersStats } from "../types/dashboard";

interface UsersSummaryCardProps {
  stats: DashboardUsersStats;
}

export function UsersSummaryCard({ stats }: UsersSummaryCardProps) {
  return (
    <Card className="flex flex-col justify-between p-0 gap-0">
      {/* Header */}
      <CardHeader className="p-3 gap-0 bg-primary rounded-t-md">
        <h3 className="text-lg m-0 text-center font-medium text-secondary">
          Usuarios
        </h3>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-4 p-4 pb-0">
        {/* Total */}
        <div className="text-center">
          <p className="text-3xl font-semibold leading-none">
            {stats.total}
          </p>
          <p className="text-sm text-muted-foreground">
            Usuarios registrados
          </p>
        </div>

        {/* Estados agregados */}
        <div className="flex justify-center gap-3 flex-wrap">
          <Badge className="bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
            Activos {stats.active}
          </Badge>

          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400">
            Ausentes {stats.away}
          </Badge>

          <Badge className="bg-red-700/10 text-red-700 dark:text-red-400">
            Inactivos {stats.inactive}
          </Badge>
        </div>

        {/* Acción */}
        <div className="flex justify-end border-t py-1">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/usuarios">Ver más</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}