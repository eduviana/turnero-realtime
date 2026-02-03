import { ColumnDef } from "@tanstack/react-table";
import { AffiliateTableRow } from "./types/affiliate";
import { Eye, Pencil } from "lucide-react";

interface BuildColumnsArgs {
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
}

// export function columns({
//   onView,
//   onEdit,
// }: BuildColumnsArgs): ColumnDef<AffiliateTableRow>[] {
//   return [
//     { accessorKey: "dni", header: "DNI" },
//     {
//       id: "fullName", // usar id si no existe accessorKey
//       header: "Nombre",
//       cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
//     },
//     { accessorKey: "organization", header: "Organización" },
//     { accessorKey: "status", header: "Estado" },
//     {
//       accessorKey: "createdAt",
//       header: "Alta",
//       cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
//     },
//     // Acciones
//     {
//       id: "actions",
//       enableHiding: false,
//       header: "Acciones",
//       cell: ({ row }) => {
//         const affiliate = row.original;

//         return (
//           <div className="flex items-center gap-2">
//             {/* VER */}
//             <button
//               type="button"
//               onClick={() => onView(affiliate.id)}
//               title="Ver afiliado"
//               className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
//             >
//               <Eye size={18} className="text-white" />
//             </button>

//             {/* EDITAR */}
//             {onEdit && (
//               <button
//                 type="button"
//                 onClick={() => onEdit(affiliate.id)}
//                 title="Editar afiliado"
//                 className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 hover:bg-blue-500 transition"
//               >
//                 <Pencil size={18} className="text-white" />
//               </button>
//             )}
//           </div>
//         );
//       },
//     },
//   ];
// }



export function columns({
  onView,
  onEdit,
}: BuildColumnsArgs): ColumnDef<AffiliateTableRow>[] {
  return [
    {
      accessorKey: "dni",
      header: () => <div className="text-left">DNI</div>,
      cell: ({ row }) => (
        <div className="text-left">{row.original.dni}</div>
      ),
    },
    {
      id: "fullName",
      header: () => <div className="text-center">Nombre</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: "organization",
      header: () => <div className="text-center">Organización</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.original.organization}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.original.status}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Alta</div>,
      cell: ({ row }) => (
        <div className="text-center">
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
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              onClick={() => onView(affiliate.id)}
              title="Ver afiliado"
              className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
            >
              <Eye size={18} className="text-white" />
            </button>

            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(affiliate.id)}
                title="Editar afiliado"
                className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 hover:bg-blue-500 transition"
              >
                <Pencil size={18} className="text-white" />
              </button>
            )}
          </div>
        );
      },
    },
  ];
}