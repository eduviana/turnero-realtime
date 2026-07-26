"use client";

import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";
import { OperatorTurnSidebar } from "./OperatorTurnSidebar";
import { FMOperatorTurnSidebar } from "./FMOperatorTurnSidebar";
import { FGOperatorTurnSidebar } from "./FGOperatorTurnSidebar";

export function OperatorTurnSidebarAdapter() {
  const { service } = useOperatorService();
  const { state, callNext, actOnCurrent, isLoading, error } =
    useTurnQueue(service!.id);

  const currentTicket = state?.currentTicket ?? null;

  switch (service?.code) {
    case "FM":
      return <FMOperatorTurnSidebar />;

    case "FG":
      return <FGOperatorTurnSidebar />;

    default:
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
          onComplete={() => actOnCurrent("COMPLETE")}
          onNoShow={() => actOnCurrent("NO_SHOW")}
          onCancel={() => actOnCurrent("CANCEL")}
        />
      );
  }
}
