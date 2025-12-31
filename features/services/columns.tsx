// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { ServiceTableRow } from "./types/service";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";

// interface Params {
//   onToggleActive?: (id: string, newValue: boolean) => void;
// }

// export function columns({
//   onToggleActive,
// }: Params = {}): ColumnDef<ServiceTableRow>[] {
//   return [
//     // Nombre (texto descriptivo → izquierda)
//     {
//       accessorKey: "name",
//       header: () => <span className="text-left">Nombre</span>,
//       cell: ({ row }) => (
//         <span className="text-left block font-medium">{row.original.name}</span>
//       ),
//     },
//     {
//       accessorKey: "isActive",
//       header: () => <span className="text-center block">Activo</span>,
//       cell: ({ row }) => {
//         const { id, isActive } = row.original;

//         return (
//           <div className="flex justify-center">
//             <Switch
//               checked={isActive}
//               onCheckedChange={(value) => onToggleActive?.(id, value)}
//             />
//           </div>
//         );
//       },
//     },

//     // Código (identificador → centrado)
//     {
//       accessorKey: "code",
//       header: () => <span className="text-center block">Código</span>,
//       cell: ({ row }) => (
//         <div className="flex justify-center">
//           <Badge className="uppercase px-3 py-1 tracking-wide">
//             {row.original.code}
//           </Badge>
//         </div>
//       ),
//     },

//     // Índice actual (numérico → derecha)
//     {
//       accessorKey: "currentIndex",
//       header: () => <span className="text-center block">Índice actual</span>,
//       cell: ({ row }) => (
//         <span className="text-center block tabular-nums">
//           {row.original.currentIndex}
//         </span>
//       ),
//     },

//     // Activo (control booleano → centro)

//     // Fecha (temporal → centro)
//     // {
//     //   accessorKey: "createdAt",
//     //   header: () => <span className="text-center block">Fecha</span>,
//     //   cell: ({ row }) => (
//     //     <span className="text-center block text-sm text-muted-foreground">
//     //       {new Date(row.original.createdAt).toLocaleDateString()}
//     //     </span>
//     //   ),
//     // },
//   ];
// }

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ServiceTableRow } from "./types/service";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Params {
  onToggleActive?: (id: string, newValue: boolean) => void;
}

export function columns({
  onToggleActive,
}: Params = {}): ColumnDef<ServiceTableRow>[] {
  return [
    {
      accessorKey: "name",
      header: () => <span className="text-left">Nombre</span>,
      cell: ({ row }) => (
        <span className="block text-left font-medium">{row.original.name}</span>
      ),
    },

    {
      accessorKey: "isActive",
      header: () => <span className="block text-center">Activo</span>,
      cell: ({ row }) => {
        const { id, isActive } = row.original;
        const canToggle = onToggleActive !== undefined;

        const handleToggle = (value: boolean) => {
          if (!onToggleActive) return;
          onToggleActive(id, value);
        };

        return (
          <div className="flex justify-center">
            <Switch
              checked={isActive}
              disabled={!canToggle}
              onCheckedChange={handleToggle}
            />
          </div>
        );
      },
    },

    {
      accessorKey: "code",
      header: () => <span className="block text-center">Código</span>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge className="uppercase px-3 py-1 tracking-wide">
            {row.original.code}
          </Badge>
        </div>
      ),
    },

    {
      accessorKey: "currentIndex",
      header: () => <span className="block text-center">Índice actual</span>,
      cell: ({ row }) => (
        <span className="block text-center tabular-nums">
          {row.original.currentIndex}
        </span>
      ),
    },
  ];
}
