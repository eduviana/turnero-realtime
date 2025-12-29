import { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";

export async function GET() {
  try {
    await requireRole("ADMIN");

    const services = await db.service.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        code: true,
        isActive: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ services }, { status: 200 });
  } catch (err: any) {
    const message = err?.message ?? "Error interno";

    if (message === "Unauthorized") {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    if (message === "Forbidden") {
      return NextResponse.json({ error: message }, { status: 403 });
    }

    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}