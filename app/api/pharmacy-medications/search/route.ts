import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  console.log("[API] pharmacy-medications search:", query);

  if (!query || query.trim().length < 2) {
    return NextResponse.json([]);
  }

  const products = await prisma.pharmacyMedicationProduct.findMany({
    where: {
      isActive: true,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(products);
}