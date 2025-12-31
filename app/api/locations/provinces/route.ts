import { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";

export const revalidate = 60 * 60 * 24; // 24h

export async function GET() {
  // 🔐 Autenticación + autorización
  const auth = await requireRole("SUPERVISOR");
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const provinces = await db.province.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(
      {
        data: provinces,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching provinces:", error);

    return NextResponse.json(
      {
        data: [],
        error: "Error obteniendo provincias",
      },
      { status: 500 }
    );
  }
}