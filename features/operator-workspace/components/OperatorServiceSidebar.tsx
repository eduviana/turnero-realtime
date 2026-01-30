// "use client";

// import { TurnQueuePanel } from "@/features/turn-queue/components/TurnQueuePanel";
// import { TurnAttentionTimer } from "@/features/operator-workspace/components/TurnAttentionTimer";
// import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
// import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";
// import { TicketStatus } from "@/generated/prisma/enums";

// export function OperatorServiceSidebar() {
//   const { service } = useOperatorService();
//   const { state } = useTurnQueue(service?.id ?? "");

//   const currentTicket = state?.currentTicket;

//   return (
//     <aside className="flex flex-col gap-4">
//       <TurnQueuePanel />

//       {currentTicket?.status === TicketStatus.IN_PROGRESS &&
//         currentTicket.startedAt && (
//           <TurnAttentionTimer
//             startedAt={currentTicket.startedAt}
//             maxMinutes={12}
//           />
//         )}
//     </aside>
//   );
// }





"use client";

import { TurnAttentionTimer } from "@/features/operator-workspace/components/TurnAttentionTimer";
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";
import { TicketStatus } from "@/generated/prisma/enums";

import { TurnQueuePanel } from "@/features/turn-queue/components/TurnQueuePanel";
import { FMServiceTurnAdapter } from "@/features/operator-workspace/areas/pharmacy-medications/components/FMServiceTurnAdapter";
import { FGServiceTurnAdapter } from "../areas/pharmacy-general/components/FGServiceTurnAdapter";


export function OperatorServiceSidebar() {
  const { service } = useOperatorService();
  const { state } = useTurnQueue(service!.id);

  const currentTicket = state?.currentTicket;

  /**
   * Service → Adapter mapping
   * El sidebar NO contiene lógica de negocio
   */
  const serviceAdapter = (() => {
    switch (service?.code) {
      case "FM":
        return <FMServiceTurnAdapter />;

      case "FG":
        return <FGServiceTurnAdapter />;

      default:
        return <TurnQueuePanel />;
    }
  })();

  return (
    <aside className="flex flex-col gap-4">
      {serviceAdapter}

      {currentTicket?.status === TicketStatus.IN_PROGRESS &&
        currentTicket.startedAt && (
          <TurnAttentionTimer
            startedAt={currentTicket.startedAt}
            maxMinutes={12}
          />
        )}
    </aside>
  );
}