import { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";

export async function GET(req: Request) {
  const auth = await requireRole("ADMIN");
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(req.url);
  const provinceId = searchParams.get("provinceId");

  const where = provinceId ? { provinceId: Number(provinceId) } : {};

  const cities = await db.city.findMany({
    where,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      provinceId: true,
    },
  });

  return NextResponse.json({ data: cities });
}
