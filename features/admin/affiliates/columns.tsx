import { ColumnDef } from "@tanstack/react-table";
import { AffiliateTableRow } from "./types/affiliate";

export function columns(): ColumnDef<AffiliateTableRow>[] {
  return [
    { accessorKey: "dni", header: "DNI" },
    { accessorKey: "fullName", header: "Nombre" },
    { accessorKey: "organization", header: "Organización" },
    { accessorKey: "status", header: "Estado" },
    {
      accessorKey: "createdAt",
      header: "Alta",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];
}