import { NextResponse } from "next/server";
import { getServiceQueueState } from "@/features/turn-queue/services/getServiceQueueState";

export async function GET(
  _req: Request,
  context: { params: Promise<{ serviceId: string }> }
) {
  const { serviceId } = await context.params;

  const state = await getServiceQueueState(serviceId);

  return NextResponse.json(state);
}