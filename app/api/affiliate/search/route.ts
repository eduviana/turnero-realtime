import { NextResponse } from "next/server";
import { requireRole } from "@/lib/roles/requireRole";
import { searchAffiliates } from "@/features/admin/affiliates/services/searchAffiliates";
import { affiliateFiltersSchema } from "@/features/admin/affiliates/schemas/affiliateFiltersSchema";
import { AffiliateSearchFilters } from "@/features/admin/affiliates/types/affiliate";

export async function POST(req: Request) {
  // 🔐 Autenticación + autorización
  const auth = await requireRole("ADMIN");
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await req.json();

    // ✅ Validación de filtros (no confiar en el cliente)
    const parsed = affiliateFiltersSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          data: [],
          error: "Filtros inválidos",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const filters = parsed.data;

    const adaptedFilters: AffiliateSearchFilters = {
      ...filters,
      createdFrom: filters.createdFrom
        ? new Date(filters.createdFrom)
        : undefined,
      createdTo: filters.createdTo ? new Date(filters.createdTo) : undefined,
    };

    const affiliates = await searchAffiliates(adaptedFilters);

    return NextResponse.json(
      {
        data: affiliates, // contrato estable
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Affiliate search error:", error);

    return NextResponse.json(
      {
        data: [], // siempre array
        error: "Error buscando afiliados",
      },
      { status: 500 }
    );
  }
}
