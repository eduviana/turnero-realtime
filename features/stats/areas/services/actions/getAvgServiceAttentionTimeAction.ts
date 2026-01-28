"use server";

import { getAvgServiceAttentionTime } from "../services/getAvgServiceAttentionTime";

export async function getAvgServiceAttentionTimeAction() {
  return getAvgServiceAttentionTime();
}