"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { PharmacyMedicationOrderRow } from "./types/pharmacy-medication";
import { formatCurrency } from "@/lib/formatCurrency";

interface BuildColumnsArgs {
  onView: (id: string) => void;
}

export function pharmacyMedicationOrdersColumns({
  onView,
}: BuildColumnsArgs): ColumnDef<PharmacyMedicationOrderRow>[] {
  return [
    // ───────────────────────────────
    // Orden (ID)
    // ───────────────────────────────
    {
      accessorKey: "id",
      header: () => <div className="text-left ml-4">Orden</div>,
      cell: ({ row }) => (
        <div className="text-left ml-4 text-sm">
          {row.getValue("id")}
        </div>
      ),
    },

    // ───────────────────────────────
    // Afiliado
    // ───────────────────────────────
    {
      accessorKey: "affiliate",
      header: () => <div className="text-center">Afiliado</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("affiliate")}</div>
      ),
    },

    // ───────────────────────────────
    // Operador
    // ───────────────────────────────
    {
      accessorKey: "operator",
      header: () => <div className="text-center">Operador</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("operator")}</div>
      ),
    },

    // ───────────────────────────────
    // Total
    // ───────────────────────────────
    {
      accessorKey: "totalAmount",
      header: () => <div className="text-center">Total</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {formatCurrency(row.getValue("totalAmount"))}
        </div>
      ),
    },

    // ───────────────────────────────
    // Fecha
    // ───────────────────────────────
    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Fecha</div>,
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date;

        return (
          <div className="text-center text-sm text-muted-foreground">
            {date.toLocaleDateString("es-AR")}
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Acciones
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