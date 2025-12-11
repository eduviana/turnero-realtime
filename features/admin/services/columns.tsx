"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ServiceTableRow } from "./types/service";
import { Eye } from "lucide-react";

export function columns({ onView }: { onView: (id: string) => void }): ColumnDef<ServiceTableRow>[] {
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
      cell: ({ row }) => (row.original.isActive ? "Sí" : "No"),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const service = row.original;

        return (
          <button
            onClick={() => onView(service.id)}
            className="p-2 rounded bg-emerald-600 hover:bg-emerald-500"
          >
            <Eye className="w-5 h-5 text-white" />
          </button>
        );
      },
    },
  ];
}