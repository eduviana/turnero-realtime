"use client";

import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";
import { usePharmacyMedicationCart } from "@/features/operator-workspace/areas/pharmacy-medications/context/PharmacyMedicationCartContext";
import { OperatorTurnSidebar } from "./OperatorTurnSidebar";
import { TicketStatus } from "@/generated/prisma/enums";

export function FMOperatorTurnSidebar() {
  const { service } = useOperatorService();
  const { state, callNext, actOnCurrent, isLoading, error } =
    useTurnQueue(service!.id);
  const { items, clear } = usePharmacyMedicationCart();

  const currentTicket = state?.currentTicket ?? null;
  const isInProgress = currentTicket?.status === TicketStatus.IN_PROGRESS;
  const canComplete = isInProgress && items.length > 0;

  const handleComplete = async () => {
    if (!currentTicket) return;

    const res = await fetch("/api/pharmacy-medications/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: currentTicket.id,
        serviceId: service!.id,
        items,
      }),
    });

    if (!res.ok) throw new Error("No se pudo crear la orden");

    await actOnCurrent("COMPLETE");
    clear();
  };

  return (
    <OperatorTurnSidebar
      serviceCode={service!.code}
      currentTicketCode={currentTicket?.code ?? null}
      currentTicketStatus={currentTicket?.status ?? null}
      currentTicketStartedAt={currentTicket?.startedAt ?? null}
      pendingCount={state?.pendingCount ?? 0}
      isLoading={isLoading}
      error={error}
      onCallNext={callNext}
      onStart={() => actOnCurrent("START")}
      onComplete={handleComplete}
      onNoShow={() => actOnCurrent("NO_SHOW")}
      onCancel={() => actOnCurrent("CANCEL")}
      canComplete={canComplete}
    />
  );
}
