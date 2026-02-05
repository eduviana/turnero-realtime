import { OrderBase } from "@/features/orders/types/orders-base";

export interface PharmacyGeneralOrder extends OrderBase {
  itemsCount: number;
}


export interface PharmacyGeneralOrderRow {
  id: string;

  ticketCode: string;

  affiliate: string;
  operator: string;
  service: string;

  itemsCount: number;

  createdAt: Date;
}



export interface PharmacyGeneralOrderItem {
  id: string;
  productName: string;
  quantity: number;
}

export interface PharmacyGeneralOrderDetail {
  id: string;
  ticketCode: string;

  affiliate?: string;
  operator: string;
  service: string;

  createdAt: string;

  items: PharmacyGeneralOrderItem[];
  totalItems: number;
}