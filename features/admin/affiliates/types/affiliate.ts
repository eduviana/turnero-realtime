// import { AffiliateStatus, AffiliateStatusReason } from "@/generated/prisma/enums";

// export type AffiliateSearchFilters = {
//   dni?: string;
//   status?: AffiliateStatus;
//   statusReason?: AffiliateStatusReason;
//   organization?: string;
//   province?: string;
//   city?: string;

//   createdFrom?: Date;
//   createdTo?: Date;

//   limit?: number;
// };

// export type AffiliateTableRow = {
//   id: string;

//   dni: string;
//   affiliateNumber?: string | null;

//   fullName: string;

//   status: AffiliateStatus;
//   statusReason: AffiliateStatusReason;

//   organization?: string | null;
//   province?: string | null;
//   city?: string | null;

//   createdAt: Date;
// };

// export type FiltersState = {
//   dni?: string;
//   status?: AffiliateStatus;
//   statusReason?: AffiliateStatusReason;
//   organization?: string;
//   province?: string;
//   city?: string;
//   createdFrom?: string;
//   createdTo?: string;
//   limit?: number;
// };




import { AffiliateStatus, AffiliateStatusReason } from "@/generated/prisma/enums";

/**
 * Filtros que viajan al backend
 * (IDs, no nombres)
 */
export type AffiliateSearchFilters = {
  dni?: string;
  status?: AffiliateStatus;
  statusReason?: AffiliateStatusReason;

  organization?: string; // falta normalizar esta tabla en la db
  provinceId?: number;
  cityId?: number;

  createdFrom?: Date;
  createdTo?: Date;

  limit?: number;
};

/**
 * Fila que se renderiza en la tabla
 * (strings ya resueltas)
 */
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

/**
 * Estado interno del formulario (UI)
 * Todo string porque viene de inputs/selects
 */
export type FiltersState = {
  dni?: string;
  status?: AffiliateStatus;
  statusReason?: AffiliateStatusReason;

  organizationId?: string;
  provinceId?: string; // select -> string
  cityId?: string;     // select -> string

  createdFrom?: string;
  createdTo?: string;
  limit?: number;
};