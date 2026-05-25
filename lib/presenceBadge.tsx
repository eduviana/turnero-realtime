import { UserPresenceStatus } from "./userPresence";

export function presenceBadge(status: UserPresenceStatus) {
  switch (status) {
    case UserPresenceStatus.ACTIVE:
      return (
        <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded">
          ACTIVO
        </span>
      );

    case UserPresenceStatus.AWAY:
      return (
        <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded">
          AUSENTE
        </span>
      );

    case UserPresenceStatus.INACTIVE:
    default:
      return (
        <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded">
          INACTIVO
        </span>
      );
  }
}