import { ServiceItem } from "@/features/affiliate-login/types/services";



export interface Ticket {
  id: string;
  code: string;
  number: number;
  createdAt: string;
  service: ServiceItem;
}