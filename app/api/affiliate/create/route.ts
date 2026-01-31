import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createAffiliateSchema } from "@/features/operator-workspace/areas/affiliations/schemas/affiliate-schema";
import { db } from "@/lib/db/prisma";


export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const parsed = createAffiliateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error },
      { status: 400 }
    );
  }

  const affiliate = await db.affiliate.create({
    data: parsed.data,
  });

  return NextResponse.json(affiliate, { status: 201 });
}