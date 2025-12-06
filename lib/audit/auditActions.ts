export const AuditActions = {
  AFILIADO_BUSQUEDA: "AFILIADO_BUSQUEDA",
  AFILIADO_SUSPENDIDO: "AFILIADO_SUSPENDIDO",
  AFILIADO_INACTIVO: "AFILIADO_INACTIVO",

  TICKET_CREADO: "TICKET_CREADO",
  TICKET_NO_CREADO: "TICKET_NO_CREADO",
  
  // Para cuando tengas login de operadores
  OPERADOR_LOGIN: "OPERADOR_LOGIN",
  OPERADOR_LOGOUT: "OPERADOR_LOGOUT",
} as const;

export type AuditAction = typeof AuditActions[keyof typeof AuditActions];