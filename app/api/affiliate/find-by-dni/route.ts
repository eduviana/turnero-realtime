import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";


const schema = z.object({
  dni: z.string().min(7).max(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dni } = schema.parse(body);

    const affiliate = await db.affiliate.findUnique({
      where: { dni },
      select: {
        id: true,
        status: true,
      },
    });

    // No existe
    if (!affiliate) {
      return NextResponse.json(
        { code: "NOT_FOUND", message: "No existe un afiliado con ese DNI." },
        { status: 404 }
      );
    }

    // Suspendido
    if (affiliate.status === "SUSPENDED") {
      return NextResponse.json(
        { code: "SUSPENDED", message: "El afiliado se encuentra suspendido." },
        { status: 403 }
      );
    }

    // Inactivo (no suspendido pero tampoco activo)
    if (affiliate.status !== "ACTIVE") {
      return NextResponse.json(
        { code: "INACTIVE", message: "El afiliado no está activo." },
        { status: 403 }
      );
    }

    // OK
    return NextResponse.json(
      {
        code: "OK",
        affiliateId: affiliate.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { code: "INVALID_DATA", message: "Datos inválidos." },
        { status: 400 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { code: "SERVER_ERROR", message: "Error inesperado." },
      { status: 500 }
    );
  }
}