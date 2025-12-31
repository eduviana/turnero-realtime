import { db } from "@/lib/db/prisma";
import { requireRole } from "@/lib/roles/requireRole";
import { NextResponse } from "next/server";
import {
  AffiliateStatus,
  AffiliateStatusReason,
} from "@/generated/prisma/enums";
import { affiliateEditSchema } from "@/features/affiliates/schemas/affiliateEdit";


export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    // Protección centralizada (autenticación + rol):
    await requireRole("ADMIN");

    const { id } = await context.params;

    const affiliate = await db.affiliate.findUnique({
      where: { id },
      include: {
        organization: { select: { name: true } },
        province: { select: { name: true } },
        city: { select: { name: true } },
      },
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: "Afiliado no encontrado" },
        { status: 404 }
      );
    }

    const data = {
      id: affiliate.id,
      dni: affiliate.dni,
      affiliateNumber: affiliate.affiliateNumber,

      firstName: affiliate.firstName,
      lastName: affiliate.lastName,
      fullName: `${affiliate.firstName} ${affiliate.lastName}`,

      phone: affiliate.phone,
      email: affiliate.email,

      organization: affiliate.organization?.name ?? null,
      organizationId: affiliate.organizationId,

      province: affiliate.province.name,
      provinceId: affiliate.provinceId,

      city: affiliate.city.name,
      cityId: affiliate.cityId,

      status: affiliate.status,
      statusReason: affiliate.statusReason,

      activatedAt: affiliate.activatedAt?.toISOString() ?? null,
      suspendedAt: affiliate.suspendedAt?.toISOString() ?? null,
      inactivatedAt: affiliate.inactivatedAt?.toISOString() ?? null,

      createdAt: affiliate.createdAt.toISOString(),
      updatedAt: affiliate.updatedAt.toISOString(),
    };

    return NextResponse.json({ affiliate: data }, { status: 200 });
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

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    /**
     * =========================
     * Autenticación / autorización
     * =========================
     */
    await requireRole("ADMIN");

    const { id } = await context.params;
    const body = await req.json();
    /**
     * =========================
     * Parse + validación Zod
     * =========================
     */

    const parsed = affiliateEditSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      dni,
      firstName,
      lastName,
      phone,
      email,
      provinceId,
      cityId,
      status,
      statusReason,
    } = parsed.data;

    /**
     * =========================
     * Verificar afiliado existente
     * =========================
     */
    const existingAffiliate = await db.affiliate.findUnique({
      where: { id },
    });

    if (!existingAffiliate) {
      return NextResponse.json(
        { error: "Afiliado no encontrado" },
        { status: 404 }
      );
    }

    /**
     * =========================
     * Validar relación provincia / ciudad
     * =========================
     */
    const city = await db.city.findUnique({
      where: { id: cityId },
      select: { provinceId: true },
    });

    if (!city || city.provinceId !== provinceId) {
      return NextResponse.json(
        {
          error: "La ciudad no pertenece a la provincia seleccionada",
        },
        { status: 400 }
      );
    }

    /**
     * =========================
     * Update (campos permitidos)
     * =========================
     */
    const updatedAffiliate = await db.affiliate.update({
      where: { id },
      data: {
        dni,
        firstName,
        lastName,
        phone,
        email,
        provinceId,
        cityId,
        status,
        statusReason,
      },
      include: {
        organization: { select: { name: true } },
        province: { select: { name: true } },
        city: { select: { name: true } },
      },
    });

    /**
     * =========================
     * Response normalizada
     * =========================
     */
    const response = {
      id: updatedAffiliate.id,
      dni: updatedAffiliate.dni,
      affiliateNumber: updatedAffiliate.affiliateNumber,

      firstName: updatedAffiliate.firstName,
      lastName: updatedAffiliate.lastName,
      fullName: `${updatedAffiliate.firstName} ${updatedAffiliate.lastName}`,

      phone: updatedAffiliate.phone,
      email: updatedAffiliate.email,

      organization: updatedAffiliate.organization?.name ?? null,
      organizationId: updatedAffiliate.organizationId,

      province: updatedAffiliate.province.name,
      provinceId: updatedAffiliate.provinceId,

      city: updatedAffiliate.city.name,
      cityId: updatedAffiliate.cityId,

      status: updatedAffiliate.status,
      statusReason: updatedAffiliate.statusReason,

      activatedAt: updatedAffiliate.activatedAt?.toISOString() ?? null,
      suspendedAt: updatedAffiliate.suspendedAt?.toISOString() ?? null,
      inactivatedAt: updatedAffiliate.inactivatedAt?.toISOString() ?? null,

      createdAt: updatedAffiliate.createdAt.toISOString(),
      updatedAt: updatedAffiliate.updatedAt.toISOString(),
    };

    return NextResponse.json({ affiliate: response }, { status: 200 });
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
