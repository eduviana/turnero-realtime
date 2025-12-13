import { AffiliateStatus, AffiliateStatusReason } from "@/generated/prisma/enums";

export type AffiliateSearchFilters = {
  dni?: string;
  status?: AffiliateStatus;
  statusReason?: AffiliateStatusReason;
  organization?: string;
  province?: string;
  city?: string;

  createdFrom?: Date;
  createdTo?: Date;

  limit?: number;
};

export type AffiliateTableRow = {
  id: string;

  dni: string;
  affiliateNumber?: string | null;

  fullName: string;

  status: AffiliateStatus;
  statusReason: AffiliateStatusReason;

  organization?: string | null;
  province?: string | null;
  city?: string | null;

  createdAt: Date;
};


export type FiltersState = {
  dni: string;
  status?: AffiliateStatus;
  statusReason?: AffiliateStatusReason;
  organization: string;
  province: string;
  city: string;
  createdFrom?: string;
  createdTo?: string;
  limit: number;
};