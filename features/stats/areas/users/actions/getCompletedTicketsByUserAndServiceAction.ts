"use server";

import { getCompletedTicketsByUserAndService } from "../services/getCompletedTicketsByUserAndService";



export async function getCompletedTicketsByUserAndServiceAction(
  serviceId: string
) {
  if (!serviceId) {
    throw new Error("serviceId is required");
  }

  return getCompletedTicketsByUserAndService(serviceId);
}