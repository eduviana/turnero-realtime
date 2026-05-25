"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";

import { UserTableRow } from "./types/users";
import { UserPresenceStatus } from "@/lib/userPresence";
import { formatLastActivity } from "./lib/formatLastActivity";
import { presenceBadge } from "@/lib/presenceBadge";

interface BuildColumnsArgs {
  onView: (id: string) => void;
  onEdit?: (id: string) => void; // 👈 opcional
}

export function columns({
  onView,
  onEdit,
}: BuildColumnsArgs): ColumnDef<UserTableRow>[] {
  return [
    // ───────────────────────────────
    // Usuario
    // ───────────────────────────────
    {
      id: "user",
      accessorFn: (row) => row.email ?? "",
      header: () => <div className="text-left">Usuario</div>,
      cell: ({ row }) => {
        const { firstName, lastName, email } = row.original;

        return (
          <div className="flex flex-col text-left">
            <span className="text-base font-bold text-gray-800">
              {firstName || lastName
                ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
                : email}
            </span>

            {email && (
              <span className="text-sm text-gray-400">{email}</span>
            )}
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Rol
    // ───────────────────────────────
    {
      accessorKey: "role",
      header: () => <div className="text-center">Rol</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded uppercase">
            {row.getValue("role")}
          </span>
        </div>
      ),
    },

    // ───────────────────────────────
    // Servicios
    // ───────────────────────────────
    {
      accessorKey: "serviceCodes",
      header: () => <div className="text-center">Áreas</div>,
      cell: ({ row }) => {
        const codes = row.getValue("serviceCodes") as string[];

        return (
          <div className="flex justify-center gap-1 flex-wrap">
            {codes.length > 0 ? (
              codes.map((code) => (
                <span
                  key={code}
                  className="bg-gray-200 text-gray-600 text-xs font-bold px-2.5 py-1 rounded"
                >
                  {code}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">—</span>
            )}
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Estado
    // ───────────────────────────────
    {
      accessorKey: "presenceStatus",
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          {presenceBadge(row.getValue("presenceStatus") as UserPresenceStatus)}
        </div>
      ),
    },

    // ───────────────────────────────
    // Última actividad
    // ───────────────────────────────
    {
      accessorKey: "lastActivityAt",
      header: () => <div className="text-center">Última actividad</div>,
      cell: ({ row }) => {
        const date = row.getValue("lastActivityAt") as Date | null;

        return (
          <div className="text-center text-sm text-gray-500">
            {formatLastActivity(date)}
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
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex justify-center gap-2">
            {/* Ver */}
            <button
              onClick={() => onView(user.id)}
              className="flex items-center justify-center w-8 h-8 rounded bg-emerald-500 hover:bg-emerald-600 transition"
              title="Ver usuario"
            >
              <Eye size={16} className="text-white" />
            </button>

            {/* Editar (solo si hay permiso) */}
            {onEdit && (
              <button
                onClick={() => onEdit(user.id)}
                className="flex items-center justify-center w-8 h-8 rounded bg-blue-500 hover:bg-blue-600 transition"
                title="Editar usuario"
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
