export const EventTypes = {
  FUNCTIONAL: "FUNCTIONAL",
  SECURITY: "SECURITY",
  SYSTEM: "SYSTEM",
} as const;

export type EventType = typeof EventTypes[keyof typeof EventTypes];