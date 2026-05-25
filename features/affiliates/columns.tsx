import { ColumnDef } from "@tanstack/react-table";
import { AffiliateTableRow } from "./types/affiliate";
import { Eye, Pencil } from "lucide-react";

interface BuildColumnsArgs {
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function columns({
  onView,
  onEdit,
}: BuildColumnsArgs): ColumnDef<AffiliateTableRow>[] {
  return [
    {
      id: "fullName",
      header: () => <div className="text-left">Nombre</div>,
      cell: ({ row }) => (
        <div className="text-left text-base font-bold text-gray-800">
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: "dni",
      header: () => <div className="text-center">DNI</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-500">
          {row.original.dni}
        </div>
      ),
    },
    {
      accessorKey: "organization",
      header: () => <div className="text-center">Organización</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-500">
          {row.original.organization}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => {
        const status = row.original.status;
        const styles: Record<string, string> = {
          ACTIVE: "bg-emerald-600 text-white",
          SUSPENDED: "bg-amber-500 text-white",
          INACTIVE: "bg-red-700 text-white",
        };

        return (
          <div className="flex justify-center">
            <span
              className={`text-xs font-bold px-3 py-1 rounded uppercase ${styles[status] ?? "bg-gray-200 text-gray-600"}`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Alta</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const affiliate = row.original;

        return (
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => onView(affiliate.id)}
              title="Ver afiliado"
              className="flex items-center justify-center w-8 h-8 rounded bg-emerald-500 hover:bg-emerald-600 transition"
            >
              <Eye size={16} className="text-white" />
            </button>

            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(affiliate.id)}
                title="Editar afiliado"
                className="flex items-center justify-center w-8 h-8 rounded bg-blue-500 hover:bg-blue-600 transition"
              >
                <Pencil size={16} className="text-white" />
              </button>
            )}
          </div>
        );
      },
    },
  ];
}
