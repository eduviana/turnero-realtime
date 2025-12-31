import {
  AffiliateStatus,
  AffiliateStatusReason,
} from "@/generated/prisma/enums";

/**
 * Filtros que viajan al backend
 * (IDs, no nombres)
 * Aquí buscamos en la DB, por lo que debemos usar los IDs
 */
export type AffiliateSearchFilters = {
  dni?: string;
  status?: AffiliateStatus;
  statusReason?: AffiliateStatusReason;

  organizationId?: number; // normalizado
  provinceId?: number;
  cityId?: number;

  createdFrom?: Date;
  createdTo?: Date;

  limit?: number;
};

/**
 * Fila que se renderiza en la tabla
 * (strings ya resueltas)
 * Mantenemos opcionalmente organizationId por si necesitamos alguna acción posterior (por ejemplo editar o link a la organización)
 * Esto es el resultado de la búsqueda
 */
export type AffiliateTableRow = {
  id: string;

  dni: string;
  affiliateNumber?: string | null;

  firstName: string;
  lastName: string;

  status: AffiliateStatus;
  statusReason: AffiliateStatusReason;

  organizationId?: number; // opcional, para referenciar
  organization?: string | null; // nombre legible
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

  organizationId?: string; // select -> string
  provinceId?: string; // select -> string
  cityId?: string; // select -> string

  createdFrom?: string;
  createdTo?: string;
  limit?: number;
};


export interface AffiliateDataViewModal {
  id: string;

  dni: string;
  affiliateNumber: string | null;

  firstName: string;
  lastName: string;
  fullName: string;

  phone: string | null;
  email: string | null;

  organization: string | null;
  organizationId: number;

  province: string;
  provinceId: number;

  city: string;
  cityId: number;

  status: AffiliateStatus;
  statusReason: AffiliateStatusReason;

  activatedAt: string | null;
  suspendedAt: string | null;
  inactivatedAt: string | null;

  createdAt: string;
  updatedAt: string;
}

export type AffiliateEditFormData = {
  dni: string;

  firstName: string;
  lastName: string;

  phone: string | null;
  email: string | null;

  provinceId: number;
  cityId: number;

  status: AffiliateStatus;
  statusReason: AffiliateStatusReason;
};