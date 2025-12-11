import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, context: any) {
  try {
    // NO destructurar arriba – Turbopack rompe params
    const { id } = await context.params;

    const body = await req.json();
    const { isActive } = body;

    if (typeof isActive !== "boolean") {
      return new NextResponse("Invalid isActive value", { status: 400 });
    }

    console.log("PATCH request received:", id, { isActive });

    const updated = await db.service.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error actualizando servicio:", error);
    return new NextResponse("Error updating service", { status: 500 });
  }
}