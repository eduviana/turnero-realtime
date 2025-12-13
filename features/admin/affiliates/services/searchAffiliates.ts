import { db } from "@/lib/db/prisma";
import { AffiliateSearchFilters } from "../types/affiliate";


export async function searchAffiliates(filters: AffiliateSearchFilters) {
  const {
    dni,
    status,
    statusReason,
    organization,
    province,
    city,
    createdFrom,
    createdTo,
    limit = 20,
  } = filters;

  return db.affiliate.findMany({
    where: {
      deletedAt: null,

      ...(dni && { dni }),
      ...(status && { status }),
      ...(statusReason && { statusReason }),
      ...(organization && { organization }),
      ...(province && { province }),
      ...(city && { city }),

      ...(createdFrom || createdTo
        ? {
            createdAt: {
              ...(createdFrom && { gte: createdFrom }),
              ...(createdTo && { lte: createdTo }),
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}