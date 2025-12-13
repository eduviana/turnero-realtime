import { NextResponse } from "next/server";
import { requireRole } from "@/lib/roles/requireRole";
import { searchAffiliates } from "@/features/admin/affiliates/services/searchAffiliates";
import { AffiliateSearchFilters } from "@/features/admin/affiliates/types/affiliate";

export async function POST(req: Request) {
  // 🔐 Autenticación + autorización
  const auth = await requireRole("ADMIN");
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const filters: AffiliateSearchFilters = await req.json();

    const affiliates = await searchAffiliates(filters);

    return NextResponse.json(
      {
        data: affiliates, // 👈 contrato estable
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Affiliate search error:", error);

    return NextResponse.json(
      {
        data: [], // 👈 incluso en error, array
        error: "Error buscando afiliados",
      },
      { status: 500 }
    );
  }
}