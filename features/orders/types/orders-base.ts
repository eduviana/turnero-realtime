/**
 * Tipo base común para cualquier orden de farmacia.
 * No depende de Prisma ni de la capa de persistencia.
 */
export interface OrderBase {
  id: string;

  /**
   * Código visible del ticket (ej: A-023)
   */
  ticketCode: string;

  /**
   * Fecha de creación de la orden
   */
  createdAt: string; // ISO string, formateable en UI

  /**
   * Operador que atendió la orden
   */
  operator: {
    id: string;
    fullName: string;
  };

  /**
   * Afiliado asociado a la orden (puede no existir)
   */
  affiliate?: {
    id: string;
    dni: string;
    fullName: string;
  };

  /**
   * Servicio desde el cual se generó la orden
   */
  service: {
    id: string;
    name: string;
  };
}

/**
 * Tipos de órdenes soportadas por la UI
 * Útil para tabs, filtros y analytics.
 */
export type OrderType = "pharmacy-general" | "pharmacy-medication";

/**
 * Filtros comunes para listados de órdenes
 */
export interface OrdersFilters {
  fromDate?: string; // ISO
  toDate?: string;   // ISO

  operatorId?: string;
  affiliateQuery?: string; // dni / nombre
  serviceId?: string;
}

/**
 * Respuesta base paginada para listados
 */
export interface OrdersListResponse<T extends OrderBase> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}