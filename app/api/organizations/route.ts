import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireRole("OPERATOR");
  if (!auth.ok) {
    return auth.response; // debería ser 401/403, no throw
  }

  try {
    const organizations = await db.organization.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ data: organizations });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { data: [], error: "Internal server error" },
      { status: 500 }
    );
  }
}
