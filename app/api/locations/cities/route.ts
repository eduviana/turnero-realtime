import { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";

export const revalidate = 60 * 60 * 24; // 24h

export async function GET(req: Request) {
  // 🔐 Autenticación + autorización
  const auth = await requireRole("ADMIN");
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const { searchParams } = new URL(req.url);
    const provinceIdParam = searchParams.get("provinceId");

    const provinceId = provinceIdParam
      ? Number(provinceIdParam)
      : undefined;

    if (provinceIdParam && Number.isNaN(provinceId)) {
      return NextResponse.json(
        {
          data: [],
          error: "provinceId inválido",
        },
        { status: 400 }
      );
    }

    const cities = await db.city.findMany({
      where: provinceId ? { provinceId } : undefined,
      select: {
        id: true,
        name: true,
        provinceId: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(
      {
        data: cities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cities:", error);

    return NextResponse.json(
      {
        data: [],
        error: "Error obteniendo ciudades",
      },
      { status: 500 }
    );
  }
}