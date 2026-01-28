"use server";

import {
  getAvgTicketDurationByUserAndService,
  AvgTicketDurationByUser,
} from "../services/getAvgTicketDurationByUserAndService";

export async function getAvgTicketDurationByUserAndServiceAction(
  serviceId: string
): Promise<AvgTicketDurationByUser[]> {
  if (!serviceId) {
    throw new Error("serviceId is required");
  }

  return getAvgTicketDurationByUserAndService(serviceId);
}