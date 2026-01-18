"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useTurnQueue } from "../hooks/useTurnQueue";
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { TicketStatus } from "@/generated/prisma/enums";
import { usePharmacyMedicationCart } from "@/features/operator-workspace/areas/pharmacy-medications/context/PharmacyMedicationCartContext";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  CheckCircle,
  CheckCircle2,
  Circle,
  UserX,
  X,
  XCircle,
} from "lucide-react";

export function TurnQueuePanel() {
  //hook que retorna el context
  const { service } = useOperatorService();

  if (!service) {
    return null;
  }

  const { items, clear } = usePharmacyMedicationCart();

  const { state, callNext, actOnCurrent, isLoading, error } = useTurnQueue(
    service.id,
  );

  const currentTicket = state?.currentTicket ?? null;
  const currentCode = currentTicket?.code ?? null;
  const currentStatus = currentTicket?.status ?? null;

  const isIdle = !currentTicket;
  const hasPending = (state?.pendingCount ?? 0) > 0;

  /**
   * UI rules
   */
  const canStart = currentStatus === TicketStatus.CALLED;
  const canComplete = currentStatus === TicketStatus.IN_PROGRESS;
  const canCancel = !!currentTicket;

  const handleCompleteWithSale = async () => {
    if (!currentTicket) return;

    try {
      // 1️⃣ crear la orden
      const res = await fetch("/api/pharmacy-medications/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: currentTicket.id,
          serviceId: service.id,
          items,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo crear la orden");
      }

      // 2️⃣ marcar turno como COMPLETE
      await actOnCurrent("COMPLETE");

      // 3️⃣ limpiar carrito
      clear();
    } catch (err) {
      console.error("[TurnQueuePanel] completeWithSale", err);
      // acá después podés mostrar toast/error
    }
  };

  return (
    <Card className="w-[340px] rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-400">
            TURNOS · {service.code}
          </CardTitle>

          <Badge className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            EN ATENCIÓN
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <p className="text-xs text-destructive text-center">{error}</p>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">Turno actual</p>

          <p className="text-4xl font-bold tracking-tight">
            {currentCode ?? "—"}
          </p>

          {isIdle && (
            <p className="mt-1 text-xs text-muted-foreground">
              Sin turno en atención
            </p>
          )}
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
          <div className="space-y-6">
            {canStart && (
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={() => actOnCurrent("START")}
              >
                Iniciar atención
              </Button>
            )}

            {canComplete && (
              <Button
                className="w-full rounded-xl py-6 font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                disabled={isLoading || items.length === 0}
                onClick={handleCompleteWithSale}
              >
                <CheckCircle2 className="h-6! w-6!" />
                Finalizar turno
              </Button>
            )}

       
            <div className="grid grid-cols-2 gap-2">
              {/* No se presentó */}
              <Button
                type="button"
                disabled={isLoading || !canCancel}
                onClick={() => actOnCurrent("NO_SHOW")}
                className="flex items-center justify-center gap-1 rounded-xl border bg-white text-slate-700 border-slate-200 px-2 py-3 text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <UserX className="h-4 w-4 text-primary" />
                No se presentó
              </Button>

              {/* Cancelar */}
              <Button
                type="button"
                disabled={isLoading || !canCancel}
                onClick={() => actOnCurrent("CANCEL")}
                className="flex items-center justify-center gap-1 rounded-xl border bg-red-50 text-red-600 border-red-100 px-2 py-3 text-sm font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 "
              >
                <span className="relative inline-flex h-4 w-4 items-center justify-center">
                  <Circle className="absolute h-4 w-4 fill-red-600 text-red-600" />
                  <X className="relative h-2.5 w-2.5 text-white" />
                </span>
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
