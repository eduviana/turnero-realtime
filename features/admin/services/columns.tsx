// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { ServiceTableRow } from "./types/service";

// export function columns(): ColumnDef<ServiceTableRow>[] {
//   return [
//     {
//       accessorKey: "name",
//       header: "Nombre",
//     },
//     {
//       accessorKey: "code",
//       header: "Código",
//     },
//     {
//       accessorKey: "currentIndex",
//       header: "Índice actual",
//     },
//     {
//       accessorKey: "isActive",
//       header: "Activo",
//       cell: ({ row }) => (row.original.isActive ? "Sí" : "No"),
//     },
//     {
//       accessorKey: "createdAt",
//       header: "Fecha",
//       cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
//     },
//   ];
// }




"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ServiceTableRow } from "./types/service";
import { Switch } from "@/components/ui/switch";

interface Params {
  onToggleActive?: (id: string, newValue: boolean) => void;
}

export function columns({ onToggleActive }: Params = {}): ColumnDef<ServiceTableRow>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "code",
      header: "Código",
    },
    {
      accessorKey: "currentIndex",
      header: "Índice actual",
    },
    {
      accessorKey: "isActive",
      header: "Activo",
      cell: ({ row }) => {
        const { id, isActive } = row.original;

        return (
          <Switch
            checked={isActive}
            onCheckedChange={(value) => onToggleActive?.(id, value)}
          />
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Fecha",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];
}