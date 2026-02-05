"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { PharmacyGeneralOrderRow } from "./types/pharmacy-general";

interface BuildColumnsArgs {
  onView: (id: string) => void;
}

export function pharmacyGeneralOrdersColumns({
  onView,
}: BuildColumnsArgs): ColumnDef<PharmacyGeneralOrderRow>[] {
  return [
    // ───────────────────────────────
    // Ticket (izquierda)
    // ───────────────────────────────
    {
      accessorKey: "ticketCode",
      header: () => <div className="text-left ml-4">Ticket</div>,
      cell: ({ row }) => (
        <div className="text-left ml-4 font-medium">
          {row.getValue("ticketCode")}
        </div>
      ),
    },

    // ───────────────────────────────
    // Afiliado (centrado)
    // ───────────────────────────────
    {
      accessorKey: "affiliate",
      header: () => <div className="text-center">Afiliado</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("affiliate")}</div>
      ),
    },

    // ───────────────────────────────
    // Operador (centrado)
    // ───────────────────────────────
    {
      accessorKey: "operator",
      header: () => <div className="text-center">Operador</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("operator")}</div>
      ),
    },

    // ───────────────────────────────
    // Servicio (centrado)
    // ───────────────────────────────
    {
      accessorKey: "service",
      header: () => <div className="text-center">Servicio</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("service")}</div>
      ),
    },

    // ───────────────────────────────
    // Ítems (centrado + sortable)
    // ───────────────────────────────
    {
      accessorKey: "itemsCount",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button variant="ghost" className="px-0">
            Ítems
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("itemsCount")}</div>
      ),
    },

    // ───────────────────────────────
    // Fecha (centrado)
    // ───────────────────────────────
    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Fecha</div>,
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date;
        return (
          <div className="text-center text-sm text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Acciones (centrado)
    // ───────────────────────────────
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            onClick={() => onView(row.original.id)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
            title="Ver orden"
          >
            <Eye size={18} className="text-white" />
          </button>
        </div>
      ),
    },
  ];
}
