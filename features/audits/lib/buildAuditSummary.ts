import {
  AuditAction,
  AuditEntity,
} from "@/generated/prisma/client";

/**
 * Metadata genérica de auditoría.
 * No asumimos estructura fija.
 */
type AuditMetadata = Record<string, unknown> | null;

interface BuildAuditSummaryParams {
  action: AuditAction;
  entity: AuditEntity;
  metadata: AuditMetadata;
}

/**
 * Devuelve un resumen corto y humano del evento de auditoría.
 * Este texto es el que se muestra en la tabla.
 */
export function buildAuditSummary({
  action,
  entity,
  metadata,
}: BuildAuditSummaryParams): string {
  switch (action) {
    case AuditAction.LOGIN:
      return "Inicio de sesión";

    case AuditAction.LOGOUT:
      return "Cierre de sesión";

    case AuditAction.CREATE:
      return `Creación de ${entityToLabel(entity)}`;

    case AuditAction.UPDATE:
      return `Actualización de ${entityToLabel(entity)}`;

    case AuditAction.DELETE:
      return `Eliminación de ${entityToLabel(entity)}`;

    case AuditAction.STATUS_CHANGE:
      return buildStatusChangeSummary(entity, metadata);

    case AuditAction.SEARCH:
      return "Búsqueda realizada";

    case AuditAction.FORBIDDEN_ACCESS:
      return buildForbiddenAccessSummary(metadata);

    case AuditAction.UNAUTHORIZED_ACCESS:
      return "Acceso no autorizado";

    default:
      return "Evento del sistema";
  }
}





function buildStatusChangeSummary(
  entity: AuditEntity,
  metadata: AuditMetadata
): string {
  const previous = metadata?.["previousValue"];
  const current = metadata?.["currentValue"];

  if (previous !== undefined && current !== undefined) {
    return `${entityToLabel(entity)}: ${String(previous)} → ${String(current)}`;
  }

  return `Cambio de estado en ${entityToLabel(entity)}`;
}

function buildForbiddenAccessSummary(
  metadata: AuditMetadata
): string {
  const path = metadata?.["attemptedPath"];

  if (typeof path === "string") {
    return `Acceso prohibido a ${path}`;
  }

  return "Acceso prohibido";
}

function entityToLabel(entity: AuditEntity): string {
  switch (entity) {
    case AuditEntity.USER:
      return "usuario";
    case AuditEntity.SERVICE:
      return "servicio";
    case AuditEntity.AFFILIATE:
      return "afiliado";
    case AuditEntity.TICKET:
      return "ticket";
    case AuditEntity.ORGANIZATION:
      return "organización";
    case AuditEntity.SYSTEM:
      return "sistema";
    default:
      return "entidad";
  }
}