"use server";

import { getCompletedTicketsByUserAndService } from "../services/getCompletedTicketsByUserAndService";

export async function getCompletedTicketsByUserAndServiceAction(serviceId: string) {
  if (!serviceId) {
    return [];
  }

  return getCompletedTicketsByUserAndService(serviceId);
}