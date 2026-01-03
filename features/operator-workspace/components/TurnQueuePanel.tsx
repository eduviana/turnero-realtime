"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface TurnQueuePanelProps {
  serviceCode: string;
  currentTurn?: string | null;
  isIdle?: boolean;
}

export function TurnQueuePanel({
  serviceCode,
  currentTurn = null,
  isIdle = !currentTurn,
}: TurnQueuePanelProps) {
  return (
    <Card className="w-[320px] rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Turnos · {serviceCode}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Turno actual */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Turno actual
          </p>

          <p className="text-3xl font-bold tracking-tight">
            {currentTurn ?? "—"}
          </p>

          {isIdle && (
            <p className="mt-1 text-xs text-muted-foreground">
              Sin turno en atención
            </p>
          )}
        </div>

        <Separator />

        {/* Acciones */}
        <div className="grid grid-cols-1 gap-2">
          <Button
            className="w-full"
            variant="default"
            disabled={!isIdle}
          >
            Llamar siguiente
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              disabled={isIdle}
            >
              Completar
            </Button>

            <Button
              variant="destructive"
              disabled={isIdle}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}