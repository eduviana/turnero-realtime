/**
 * Estados derivados de presencia del usuario.
 * NO se persisten en base de datos.
 */
export enum UserPresenceStatus {
  ACTIVE = "ACTIVE",
  AWAY = "AWAY",
  INACTIVE = "INACTIVE",
}

/**
 * Configuración de umbrales (en minutos).
 * Centralizada para evitar valores mágicos distribuidos.
 */
export const USER_PRESENCE_THRESHOLDS = {
  ACTIVE_MINUTES: 12,
  AWAY_MINUTES: 20,
} as const;

/**
 * Resultado del cálculo de presencia.
 * Útil para UI (labels, badges, colores, etc).
 */
export interface UserPresenceResult {
  status: UserPresenceStatus;
  minutesSinceLastActivity: number | null;
}

/**
 * Calcula el estado de presencia del usuario a partir de su última actividad.
 *
 * Reglas:
 * - Sin actividad registrada → INACTIVE
 * - <= ACTIVE_MINUTES → ACTIVE
 * - > ACTIVE_MINUTES && <= AWAY_MINUTES → AWAY
 * - > AWAY_MINUTES → INACTIVE
 */
export function calculateUserPresence(
  lastActivityAt: Date | null | undefined,
  now: Date = new Date()
): UserPresenceResult {
  if (!lastActivityAt) {
    return {
      status: UserPresenceStatus.INACTIVE,
      minutesSinceLastActivity: null,
    };
  }

  const diffMs = now.getTime() - lastActivityAt.getTime();
  const minutes = Math.floor(diffMs / 1000 / 60);

  if (minutes <= USER_PRESENCE_THRESHOLDS.ACTIVE_MINUTES) {
    return {
      status: UserPresenceStatus.ACTIVE,
      minutesSinceLastActivity: minutes,
    };
  }

  if (minutes <= USER_PRESENCE_THRESHOLDS.AWAY_MINUTES) {
    return {
      status: UserPresenceStatus.AWAY,
      minutesSinceLastActivity: minutes,
    };
  }

  return {
    status: UserPresenceStatus.INACTIVE,
    minutesSinceLastActivity: minutes,
  };
}