"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useTurnQueue } from "../hooks/useTurnQueue";
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { TicketStatus } from "@/generated/prisma/enums";
import { usePharmacyMedicationCart } from "@/features/operator-workspace/areas/pharmacy-medications/context/PharmacyMedicationCartContext";

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
    <Card className="w-[320px] rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Turnos · {service.code}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <p className="text-xs text-destructive text-center">{error}</p>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">Turno actual</p>

          <p className="text-3xl font-bold tracking-tight">
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
          <div className="space-y-2">
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
                className="w-full"
                disabled={isLoading || items.length === 0}
                onClick={handleCompleteWithSale}
              >
                Finalizar turno
              </Button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                disabled={isLoading || !canCancel}
                onClick={() => actOnCurrent("NO_SHOW")}
              >
                No se presentó
              </Button>

              <Button
                variant="destructive"
                disabled={isLoading || !canCancel}
                onClick={() => actOnCurrent("CANCEL")}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
