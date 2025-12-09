"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { UserTableRow } from "./types/users";

interface BuildColumnsArgs {
  onView: (id: string) => void;
}

export function columns({
  onView,
}: BuildColumnsArgs): ColumnDef<UserTableRow>[] {
  return [
    // Selección múltiple
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    // Email
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },

    // Nombre
    {
      accessorKey: "firstName",
      header: "Nombre",
      cell: ({ row }) => row.getValue("firstName") ?? "-",
    },

    // Apellido
    {
      accessorKey: "lastName",
      header: "Apellido",
      cell: ({ row }) => row.getValue("lastName") ?? "-",
    },

    // Rol
    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        // <div className="uppercase">{row.getValue("role")}</div>
        <Badge variant="default" className="uppercase tracking-wide mt-2">
          <span className="text-white">{row.getValue("role")}</span>
        </Badge>
      ),
    },

    // Fecha de alta
    {
      accessorKey: "createdAt",
      header: "Fecha de alta",
      cell: ({ row }) => {
        const value = row.getValue("createdAt") as string;
        const date = new Date(value);

        return (
          <div className="text-sm text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },

    // Acciones
    {
      id: "actions",
      enableHiding: false,
      header: "Acciones",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <button
            onClick={() => onView(user.id)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition duration-300"
          >
            <Eye size={24} className="text-white" />
          </button>
        );
      },
    },
  ];
}
