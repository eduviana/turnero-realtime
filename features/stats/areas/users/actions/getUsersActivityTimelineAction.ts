"use server";

import { getUsersActivityTimeline } from "../services/getUsersActivityTimeline";

export async function getUsersActivityTimelineAction(
  granularity: "day" | "week" | "month"
) {
  return getUsersActivityTimeline(granularity);
}