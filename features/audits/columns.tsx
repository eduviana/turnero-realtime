import { ColumnDef } from "@tanstack/react-table";
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
const EVENT_TYPE_BADGE_CLASS: Record<AuditLogRow["eventType"], string> = {
  SECURITY: "bg-red-600 text-white",
  SYSTEM: "bg-blue-600 text-white",
  FUNCTIONAL: "bg-emerald-600 text-white",
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
      header: () => <div className="text-left">Usuario</div>,
      cell: ({ row }) => (
        <div className="text-left text-base font-bold text-gray-800">
          {row.original.actorEmail ?? "—"}
        </div>
      ),
    },

    {
      accessorKey: "eventType",
      header: () => <div className="text-center">Tipo</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span
            className={`text-xs font-bold px-3 py-1 rounded uppercase ${
              EVENT_TYPE_BADGE_CLASS[row.original.eventType]
            }`}
          >
            {row.original.eventType}
          </span>
        </div>
      ),
    },

    {
      accessorKey: "action",
      header: () => <div className="text-center">Acción</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-500 whitespace-nowrap">
          {row.original.action}
        </div>
      ),
    },

    {
      accessorKey: "summary",
      header: () => <div className="text-center">Detalle</div>,
      cell: ({ row }) => (
        <div
          className="text-center text-sm text-gray-500 max-w-[420px] truncate"
          title={row.original.summary}
        >
          {row.original.summary}
        </div>
      ),
    },

    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Fecha</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-500 whitespace-nowrap">
          {row.original.createdAt}
        </div>
      ),
    },

    {
      id: "view",
      enableSorting: false,
      header: () => <div className="text-center" />,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onView(row.original)}
            className="flex items-center justify-center w-8 h-8 rounded bg-emerald-500 hover:bg-emerald-600 transition"
            title="Ver detalle"
          >
            <Eye size={16} className="text-white" />
          </button>
        </div>
      ),
    },
  ];
}
