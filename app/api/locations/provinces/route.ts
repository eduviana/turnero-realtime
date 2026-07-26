import { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";

export async function GET() {
  const auth = await requireRole("ADMIN");
  if (!auth.ok) return auth.response;

  const provinces = await db.province.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json({ data: provinces });
}
