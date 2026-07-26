"use client";

import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";
import { usePharmacyGeneralCart } from "@/features/operator-workspace/areas/pharmacy-general/context/PharmacyGeneralCartContext";
import { OperatorTurnSidebar } from "./OperatorTurnSidebar";
import { TicketStatus } from "@/generated/prisma/enums";

export function FGOperatorTurnSidebar() {
  const { service } = useOperatorService();
  const { state, callNext, actOnCurrent, isLoading, error } =
    useTurnQueue(service!.id);
  const { items, clear } = usePharmacyGeneralCart();

  const currentTicket = state?.currentTicket ?? null;
  const isInProgress = currentTicket?.status === TicketStatus.IN_PROGRESS;
  const canComplete = isInProgress && items.length > 0;

  const handleComplete = async () => {
    if (!currentTicket) return;

    const res = await fetch("/api/pharmacy-general/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: currentTicket.id,
        serviceId: service!.id,
        items,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        errorData?.error ?? "No se pudo crear la orden de farmacia general",
      );
    }

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
