"use client";

import { TurnQueuePanel } from "@/features/turn-queue/components/TurnQueuePanel";
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";
import { usePharmacyMedicationCart } from "../context/PharmacyMedicationCartContext";
import { TicketStatus } from "@/generated/prisma/enums";

export function FMServiceTurnAdapter() {
  const { service } = useOperatorService();
  const { state, actOnCurrent } = useTurnQueue(service!.id);
  const { items, clear } = usePharmacyMedicationCart();

  const currentTicket = state?.currentTicket;

  const canComplete =
    currentTicket?.status === TicketStatus.IN_PROGRESS &&
    items.length > 0;

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

    if (!res.ok) {
      throw new Error("No se pudo crear la orden");
    }

    await actOnCurrent("COMPLETE");
    clear();
  };

  return (
    <TurnQueuePanel
      canComplete={canComplete}
      onComplete={handleComplete}
    />
  );
}