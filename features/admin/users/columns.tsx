// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { ArrowUpDown, Eye } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// import { UserTableRow } from "./types/users";
// import { formatLastActivity } from "./lib/formatLastActivity";

// interface BuildColumnsArgs {
//   onView: (id: string) => void;
// }

// export function columns({
//   onView,
// }: BuildColumnsArgs): ColumnDef<UserTableRow>[] {
//   return [
//     // Usuario (nombre + apellido + email para filtro)
//     {
//       id: "user",
//       accessorFn: (row) => row.email ?? "",
//       header: "Usuario",
//       cell: ({ row }) => {
//         const { firstName, lastName, email } = row.original;

//         return (
//           <div className="flex flex-col">
//             <span className="font-medium text-base">
//               {firstName || lastName
//                 ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
//                 : email}
//             </span>

//             {email && (
//               <span className="text-xs text-muted-foreground">{email}</span>
//             )}
//           </div>
//         );
//       },
//     },

//     // Rol
//     {
//       accessorKey: "role",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           className="text-base font-medium"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Rol
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       ),
//       cell: ({ row }) => (
//         <Badge variant="default" className="uppercase px-3 py-1 tracking-wide">
//           {row.getValue("role")}
//         </Badge>
//       ),
//     },

//     // Estado online
//     {
//       accessorKey: "isOnline",
//       header: "Estado",
//       cell: ({ row }) => {
//         const isOnline = row.getValue("isOnline") as boolean;

//         return (
//           <Badge
//             variant={"destructive"}
//             className={`uppercase px-3 py-1 tracking-wide ${
//               isOnline ? "bg-emerald-600" : "bg-red-700"
//             }`}
//           >
//             {isOnline ? "ONLINE" : "OFFLINE"}
//           </Badge>
//         );
//       },
//     },

//     // Última actividad
//     {
//       accessorKey: "lastActivityAt",
//       header: "Última actividad",
//       cell: ({ row }) => {
//         const date = row.getValue("lastActivityAt") as Date | null;

//         return <span className="text-sm">{formatLastActivity(date)}</span>;
//       },
//     },

//     // Acciones
//     {
//       id: "actions",
//       enableHiding: false,
//       header: "Acciones",
//       cell: ({ row }) => {
//         const user = row.original;

//         return (
//           <button
//             onClick={() => onView(user.id)}
//             className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
//           >
//             <Eye size={20} className="text-white" />
//           </button>
//         );
//       },
//     },
//   ];
// }










"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { UserTableRow } from "./types/users";
import { formatLastActivity } from "./lib/formatLastActivity";

interface BuildColumnsArgs {
  onView: (id: string) => void;
}

export function columns({
  onView,
}: BuildColumnsArgs): ColumnDef<UserTableRow>[] {
  return [
    // ───────────────────────────────
    // Usuario (nombre + email)
    // Texto principal → izquierda
    // ───────────────────────────────
    {
      id: "user",
      accessorFn: (row) => row.email ?? "",
      header: () => <div className="text-left">Usuario</div>,
      cell: ({ row }) => {
        const { firstName, lastName, email } = row.original;

        return (
          <div className="flex flex-col text-left">
            <span className="font-medium text-base">
              {firstName || lastName
                ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
                : email}
            </span>

            {email && (
              <span className="text-xs text-muted-foreground">{email}</span>
            )}
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Rol
    // Badge → centrado
    // ───────────────────────────────
    {
      accessorKey: "role",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="text-base font-medium"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Rol
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge className="uppercase px-3 py-1 tracking-wide">
            {row.getValue("role")}
          </Badge>
        </div>
      ),
    },

    // ───────────────────────────────
    // Estado online
    // Estado binario → centrado
    // ───────────────────────────────
    {
      accessorKey: "isOnline",
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => {
        const isOnline = row.getValue("isOnline") as boolean;

        return (
          <div className="flex justify-center">
            <Badge
              className={`uppercase px-3 py-1 tracking-wide ${
                isOnline
                  ? "bg-emerald-600 text-white"
                  : "bg-red-700 text-white"
              }`}
            >
              {isOnline ? "ONLINE" : "OFFLINE"}
            </Badge>
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Última actividad
    // Tiempo → centrado
    // ───────────────────────────────
    {
      accessorKey: "lastActivityAt",
      header: () => <div className="text-center">Última actividad</div>,
      cell: ({ row }) => {
        const date = row.getValue("lastActivityAt") as Date | null;

        return (
          <div className="text-center text-sm text-muted-foreground">
            {formatLastActivity(date)}
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Acciones
    // Acción → centrado
    // ───────────────────────────────
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex justify-center">
            <button
              onClick={() => onView(user.id)}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
            >
              <Eye size={20} className="text-white" />
            </button>
          </div>
        );
      },
    },
  ];
}