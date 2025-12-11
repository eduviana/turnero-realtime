import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db/prisma";
import { ROLE_HIERARCHY } from "@/lib/roles/role-hierarchy";
import { NextResponse } from "next/server";

export async function requireRole(minRole: keyof typeof ROLE_HIERARCHY) {
  const { userId } = await auth();

  if (!userId) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  const userLevel = ROLE_HIERARCHY[user.role];
  const requiredLevel = ROLE_HIERARCHY[minRole];

  if (userLevel < requiredLevel) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true, role: user.role };
}
