import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    // Protección centralizada (autenticación + rol):
    await requireRole("ADMIN");

    const { id } = await context.params;

    // const user = await db.user.findUnique({
    //   where: { id },
    //   select: {
    //     id: true,
    //     email: true,
    //     firstName: true,
    //     lastName: true,
    //     profileImage: true,
    //     role: true,
    //     createdAt: true,
    //     updatedAt: true,
    //   },
    // });
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        userStatus: {
          select: {
            isOnline: true,
            lastActivityAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
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
