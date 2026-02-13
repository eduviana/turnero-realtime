"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, UserX, X } from "lucide-react";

import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "../hooks/useTurnQueue";
import { TicketStatus } from "@/generated/prisma/enums";

interface TurnQueuePanelProps {
  canComplete?: boolean;
  onComplete?: () => Promise<void>;
}

export function TurnQueuePanel({
  canComplete,
  onComplete,
}: TurnQueuePanelProps) {
  const { service } = useOperatorService();
  if (!service) return null;

  const { state, callNext, actOnCurrent, isLoading, error } = useTurnQueue(
    service.id,
  );


  const currentTicket = state?.currentTicket ?? null;
  const currentStatus = currentTicket?.status ?? null;

  const isIdle = !currentTicket;
  const hasPending = (state?.pendingCount ?? 0) > 0;

  const canStart = currentStatus === TicketStatus.CALLED;
  const allowComplete =
    currentStatus === TicketStatus.IN_PROGRESS && !!canComplete;

    

  return (
    <Card className="w-[340px] h-[300px] rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-400">
            TURNOS · {service.code}
          </CardTitle>

          {/* {currentStatus === TicketStatus.CALLED && (
            <Badge className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              EN ATENCIÓN
            </Badge>
          )} */}
           {currentStatus === TicketStatus.IN_PROGRESS && (
            <Badge className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              EN ATENCIÓN
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <p className="text-xs text-destructive text-center">{error}</p>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">Turno actual</p>
          <p className="text-4xl font-bold tracking-tight">
            {currentTicket?.code ?? "—"}
          </p>
        </div>

        <Separator />

        {isIdle ? (
          <Button
            className="w-full"
            disabled={isLoading || !hasPending}
            onClick={callNext}
          >
            Llamar siguiente
          </Button>
        ) : (
          <div className="space-y-4">
            {canStart && (
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={() => actOnCurrent("START")}
              >
                Iniciar atención
              </Button>
            )}

            {allowComplete && onComplete && (
              <Button
                className="w-full py-6 font-bold flex gap-2"
                disabled={isLoading}
                onClick={onComplete}
              >
                <CheckCircle2 className="h-5 w-5" />
                Finalizar turno
              </Button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                disabled={isLoading}
                onClick={() => actOnCurrent("NO_SHOW")}
                variant="outline"
              >
                <UserX className="h-4 w-4 mr-1" />
                Ausente
              </Button>

              <Button
                disabled={isLoading}
                onClick={() => actOnCurrent("CANCEL")}
                variant="destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
