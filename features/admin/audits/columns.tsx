import { ColumnDef } from "@tanstack/react-table";
import { AuditLogRow } from "./types/audit";

interface BuildColumnsProps {}

export const columns = ({}: BuildColumnsProps): ColumnDef<AuditLogRow>[] => [
  {
    id: "actor",
    header: "Actor",
    cell: ({ row }) => {
      const actor = row.original.actor;

      return <span className="text-sm">{actor?.email ?? "SYSTEM"}</span>;
    },
  },
  {
    accessorKey: "eventType",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("eventType") as string;

      const map: Record<string, string> = {
        SYSTEM: "Sistema",
        SECURITY: "Seguridad",
        FUNCTIONAL: "Funcional",
      };

      return <span className="text-sm">{map[type] ?? type}</span>;
    },
  },

  {
    accessorKey: "action",
    header: "Acción",
    cell: ({ row }) => {
      const action = row.getValue("action") as string;

      return (
        <span className="font-medium text-sm">
          {action.replaceAll("_", " ")}
        </span>
      );
    },
  },

  {
    accessorKey: "ip",
    header: "IP",
    cell: ({ row }) => {
      const ip = row.getValue("ip") as string | null;

      return <span className="text-sm text-muted-foreground">{ip ?? "—"}</span>;
    },
  },

  {
    accessorKey: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const metadata = row.getValue("metadata");

      if (!metadata) {
        return <span className="text-muted-foreground">—</span>;
      }

      const stringified = JSON.stringify(metadata);

      return (
        <span
          title={stringified}
          className="text-xs text-muted-foreground truncate max-w-[220px] block"
        >
          {stringified}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      const date = new Date(value);

      return (
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {date.toLocaleDateString()}{" "}
          <span className="text-xs">{date.toLocaleTimeString()}</span>
        </div>
      );
    },
  },
];
