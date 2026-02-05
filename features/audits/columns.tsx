import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { AuditLogRow } from "./types/audit";

/**
 * Props para inyectar acciones externas
 */
interface AuditColumnsProps {
  onView: (audit: AuditLogRow) => void;
}

/**
 * Mapa explícito de estilos por tipo de auditoría.
 * Si se agrega un nuevo AuditEventType, TypeScript falla acá.
 */
const EVENT_TYPE_BADGE_CLASS: Record<
  AuditLogRow["eventType"],
  string
> = {
  SECURITY: "bg-red-600 text-white px-2 py-1",
  SYSTEM: "bg-blue-600 text-white px-2 py-1",
  FUNCTIONAL: "bg-emerald-600 text-white px-2 py-1",
};

/**
 * Columnas de auditorías
 */
export function auditColumns({
  onView,
}: AuditColumnsProps): ColumnDef<AuditLogRow>[] {
  return [
    /* =======================
     * Usuario
     * ======================= */
    {
      accessorKey: "actorEmail",
      header: () => <div className="text-left ml-10">Usuario</div>,
      cell: ({ row }) => (
        <div className="text-left text-sm whitespace-nowrap">
          {row.original.actorEmail ?? "—"}
        </div>
      ),
    },

    /* =======================
     * Tipo
     * ======================= */
    {
      accessorKey: "eventType",
      header: () => <div className="text-center">Tipo</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`text-xs font-medium ${
              EVENT_TYPE_BADGE_CLASS[row.original.eventType]
            }`}
          >
            {row.original.eventType}
          </Badge>
        </div>
      ),
    },

    /* =======================
     * Acción
     * ======================= */
    {
      accessorKey: "action",
      header: () => <div className="text-center">Acción</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm font-medium whitespace-nowrap">
          {row.original.action}
        </div>
      ),
    },

    /* =======================
     * Detalle
     * ======================= */
    {
      accessorKey: "summary",
      header: () => <div className="text-center">Detalle</div>,
      cell: ({ row }) => (
        <div
          className="text-center max-w-[420px] truncate text-sm"
          title={row.original.summary}
        >
          {row.original.summary}
        </div>
      ),
    },

    /* =======================
     * Fecha
     * ======================= */
    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Fecha</div>,
      cell: ({ row }) => (
        <div className="text-center whitespace-nowrap text-sm text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleString()}
        </div>
      ),
    },

    /* =======================
     * Ver más (acción)
     * ======================= */
    {
      id: "view",
      enableSorting: false,
      header: () => <div className="text-center w-10" />,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onView(row.original)}
            className="flex items-center justify-center w-8 h-8 rounded-md
                       bg-emerald-600 hover:bg-emerald-500 transition"
            title="Ver detalle"
          >
            <Eye className="h-4 w-4 text-white" />
          </button>
        </div>
      ),
    },
  ];
}