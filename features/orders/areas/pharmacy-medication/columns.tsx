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
    {
      accessorKey: "id",
      header: () => <div className="text-left">Orden</div>,
      cell: ({ row }) => (
        <div className="text-left text-base font-bold text-gray-800">
          {row.getValue("id")}
        </div>
      ),
    },

    {
      accessorKey: "affiliate",
      header: () => <div className="text-center">Afiliado</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-500">
          {row.getValue("affiliate")}
        </div>
      ),
    },

    {
      accessorKey: "operator",
      header: () => <div className="text-center">Operador</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-500">
          {row.getValue("operator")}
        </div>
      ),
    },

    {
      accessorKey: "totalAmount",
      header: () => <div className="text-center">Total</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm font-medium text-gray-700">
          {formatCurrency(row.getValue("totalAmount"))}
        </div>
      ),
    },

    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Fecha</div>,
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date;

        return (
          <div className="text-center text-sm text-gray-500">
            {date.toLocaleDateString("es-AR")}
          </div>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            onClick={() => onView(row.original.id)}
            className="flex items-center justify-center w-8 h-8 rounded bg-emerald-500 hover:bg-emerald-600 transition"
            title="Ver orden"
          >
            <Eye size={16} className="text-white" />
          </button>
        </div>
      ),
    },
  ];
}