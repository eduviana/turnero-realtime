import { Badge } from "@/components/ui/badge";
import { UserPresenceStatus } from "./userPresence";

export function presenceBadge(status: UserPresenceStatus) {
  switch (status) {
    case UserPresenceStatus.ACTIVE:
      return (
        <Badge className="uppercase px-3 py-1 bg-emerald-600 text-white">
          ACTIVO
        </Badge>
      );

    case UserPresenceStatus.AWAY:
      return (
        <Badge className="uppercase px-3 py-1 bg-amber-500 text-white">
          AUSENTE
        </Badge>
      );

    case UserPresenceStatus.INACTIVE:
    default:
      return (
        <Badge className="uppercase px-3 py-1 bg-red-700 text-white">
          INACTIVO
        </Badge>
      );
  }
}