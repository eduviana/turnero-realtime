
import { Affiliate } from "@/generated/prisma/client";
import { AffiliateTableRow } from "../types/affiliate";

export function toAffiliateTableRow(a: Affiliate): AffiliateTableRow {
  return {
    id: a.id,

    dni: a.dni,
    affiliateNumber: a.affiliateNumber ?? null,

    fullName: `${a.lastName}, ${a.firstName}`,

    status: a.status,
    statusReason: a.statusReason,

    organization: a.organization ?? null,
    province: a.province ?? null,
    city: a.city ?? null,

    createdAt: a.createdAt,
  };
}