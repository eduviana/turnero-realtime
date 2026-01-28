import { NextResponse } from "next/server";
import { getTurnScreenState } from "@/features/turns-screen/services/getTurnScreenState";

export async function GET() {
  const state = await getTurnScreenState();
  return NextResponse.json(state);
}