"use server";

import { getTicketsByService } from "../services/getTicketsByService";
import { TicketsByServiceMetric } from "../types/types";

export async function getTicketsByServiceAction(
  metric: TicketsByServiceMetric
) {
  return getTicketsByService(metric);
}