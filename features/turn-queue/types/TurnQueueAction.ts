/**
 * Acciones válidas que un operador puede ejecutar
 * sobre el turno actual de un servicio.
 */
export const TURN_QUEUE_ACTIONS = [
  "START",
  "COMPLETE",
  "CANCEL",
  "NO_SHOW",
] as const;

export type TurnQueueAction = typeof TURN_QUEUE_ACTIONS[number];