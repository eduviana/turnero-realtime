import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    // Autenticación + autorización
    await requireRole("ADMIN");

    const { id } = await context.params;

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
            lastActivityAt: true,
          },
        },

        services: {
          where: {
            isActive: true,
          },
          orderBy: {
            isPrimary: "desc",
          },
          select: {
            id: true,
            isPrimary: true,
            isActive: true,
            service: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
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



//se usa en el modal de edicion de /admin/usuarios para editar el/los servicios asociados a un usuario
export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await requireRole("ADMIN");

    const { id: userId } = await context.params;
    const body = await req.json();

    const services: {
      serviceId: string;
      assigned: boolean;
      isPrimary: boolean;
    }[] = body.services ?? [];

    const primaryServices = services.filter(
      (s) => s.assigned && s.isPrimary
    );

    if (primaryServices.length > 1) {
      return NextResponse.json(
        { error: "Solo puede haber un servicio primario" },
        { status: 400 }
      );
    }

    await db.$transaction(async (tx) => {
      // 1. Desactivar todos los servicios actuales
      await tx.userService.updateMany({
        where: { userId },
        data: {
          isActive: false,
          isPrimary: false,
        },
      });

      // 2. Activar / crear los servicios asignados
      for (const service of services) {
        if (!service.assigned) continue;

        await tx.userService.upsert({
          where: {
            userId_serviceId: {
              userId,
              serviceId: service.serviceId,
            },
          },
          update: {
            isActive: true,
            isPrimary: service.isPrimary,
          },
          create: {
            userId,
            serviceId: service.serviceId,
            isActive: true,
            isPrimary: service.isPrimary,
          },
        });
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
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