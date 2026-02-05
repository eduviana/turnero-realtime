"use server";

import { getAuditsOverTime } from "../services/getAuditsOverTime";

export async function getAuditsOverTimeAction(days?: number) {
  return getAuditsOverTime(days);
}