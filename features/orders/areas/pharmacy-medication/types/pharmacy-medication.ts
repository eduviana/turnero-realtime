import { OrderBase } from "@/features/orders/types/orders-base";

/**
 * Orden de farmacia medicamentos (lista / backend)
 */
export interface PharmacyMedicationOrder extends OrderBase {
  itemsCount: number;
  totalAmount: string;
}

/**
 * Fila de la tabla (UI)
 */
export interface PharmacyMedicationOrderRow {
  id: string;
  affiliate: string;
  operator: string;
  totalAmount: string;
  createdAt: Date;
}

/**
 * Ítem dentro de una orden (modal / detalle)
 */
export interface PharmacyMedicationOrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}

/**
 * Detalle completo de una orden (modal)
 */
export interface PharmacyMedicationOrderDetail {
  id: string;
  ticketCode: string;

  affiliate?: {
    id: string;
    dni: string;
    fullName: string;
  };

  operator: string;
  service: string;
  createdAt: string;

  items: PharmacyMedicationOrderItem[];
  totalItems: number;

  totalAmount: string;
}
