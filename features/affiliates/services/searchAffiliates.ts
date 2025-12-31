import { db } from "@/lib/db/prisma";
import { AffiliateSearchFilters } from "../types/affiliate";
import { AffiliateTableRow } from "../types/affiliate";

export async function searchAffiliates(
  filters: AffiliateSearchFilters
): Promise<AffiliateTableRow[]> {
  const {
    dni,
    status,
    statusReason,
    organizationId,
    provinceId,
    cityId,
    createdFrom,
    createdTo,
    limit = 20,
  } = filters;

  const affiliates = await db.affiliate.findMany({
    where: {
      deletedAt: null,

      ...(dni && { dni }),
      ...(status && { status }),
      ...(statusReason && { statusReason }),

      ...(organizationId && { organizationId }),
      ...(provinceId && { provinceId }),
      ...(cityId && { cityId }),

      ...(createdFrom || createdTo
        ? {
            createdAt: {
              ...(createdFrom && { gte: createdFrom }),
              ...(createdTo && { lte: createdTo }),
            },
          }
        : {}),
    },

    include: {
      organization: {
        select: { name: true },
      },
      province: {
        select: { name: true },
      },
      city: {
        select: { name: true },
      },
    },

    orderBy: { createdAt: "desc" },
    take: limit,
  });

  // 🔑 Adaptación al DTO de la tabla
  return affiliates.map((a) => ({
    id: a.id,
    dni: a.dni,
    affiliateNumber: a.affiliateNumber,
    firstName: a.firstName,
    lastName: a.lastName,
    status: a.status,
    statusReason: a.statusReason,

    organization: a.organization?.name ?? null,
    province: a.province?.name ?? null,
    city: a.city?.name ?? null,

    createdAt: a.createdAt,
  }));
}
