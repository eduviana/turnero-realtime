// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { ArrowUpDown, Eye, Pencil } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// import { UserTableRow } from "./types/users";
// import { formatLastActivity } from "./lib/formatLastActivity";

// interface BuildColumnsArgs {
//   onView: (id: string) => void;
//   onEdit: (id: string) => void;
// }

// export function columns({
//   onView,
//   onEdit,
// }: BuildColumnsArgs): ColumnDef<UserTableRow>[] {
//   return [
//     // ───────────────────────────────
//     // Usuario (nombre + email)
//     // ───────────────────────────────
//     {
//       id: "user",
//       accessorFn: (row) => row.email ?? "",
//       header: () => <div className="text-left">Usuario</div>,
//       cell: ({ row }) => {
//         const { firstName, lastName, email } = row.original;

//         return (
//           <div className="flex flex-col text-left">
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

//     // ───────────────────────────────
//     // Rol
//     // ───────────────────────────────
//     {
//       accessorKey: "role",
//       header: ({ column }) => (
//         <div className="flex justify-center">
//           <Button
//             variant="ghost"
//             className="text-base font-medium"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Rol
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       ),
//       cell: ({ row }) => (
//         <div className="flex justify-center">
//           <Badge className="uppercase px-3 py-1 tracking-wide">
//             {row.getValue("role")}
//           </Badge>
//         </div>
//       ),
//     },

//     // ───────────────────────────────
//     // Servicios
//     // ───────────────────────────────
//    {
//   accessorKey: "serviceCodes",
//   header: () => <div className="text-center">Servicios</div>,
//   cell: ({ row }) => {
//     const codes = row.getValue("serviceCodes") as string[];

//     return (
//       <div className="flex justify-center gap-1 flex-wrap">
//         {codes.length > 0 ? (
//           codes.map(code => (
//             <Badge
//               key={code}
//               variant="secondary"
//               className="px-3 py-1 tracking-wide"
//             >
//               {code}
//             </Badge>
//           ))
//         ) : (
//           <span className="text-muted-foreground text-sm">—</span>
//         )}
//       </div>
//     );
//   },
// },

//     // ───────────────────────────────
//     // Estado online
//     // ───────────────────────────────
//     {
//       accessorKey: "isOnline",
//       header: () => <div className="text-center">Estado</div>,
//       cell: ({ row }) => {
//         const isOnline = row.getValue("isOnline") as boolean;

//         return (
//           <div className="flex justify-center">
//             <Badge
//               className={`uppercase px-3 py-1 tracking-wide ${
//                 isOnline ? "bg-emerald-600 text-white" : "bg-red-700 text-white"
//               }`}
//             >
//               {isOnline ? "ONLINE" : "OFFLINE"}
//             </Badge>
//           </div>
//         );
//       },
//     },

//     // ───────────────────────────────
//     // Última actividad
//     // ───────────────────────────────
//     {
//       accessorKey: "lastActivityAt",
//       header: () => <div className="text-center">Última actividad</div>,
//       cell: ({ row }) => {
//         const date = row.getValue("lastActivityAt") as Date | null;

//         return (
//           <div className="text-center text-sm text-muted-foreground">
//             {formatLastActivity(date)}
//           </div>
//         );
//       },
//     },

//     // ───────────────────────────────
//     // Acciones
//     // ───────────────────────────────
//     {
//       id: "actions",
//       enableHiding: false,
//       header: () => <div className="text-center">Acciones</div>,
//       cell: ({ row }) => {
//         const user = row.original;

//         return (
//           <div className="flex justify-center gap-2">
//             {/* Ver */}
//             <button
//               onClick={() => onView(user.id)}
//               className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
//               title="Ver usuario"
//             >
//               <Eye size={18} className="text-white" />
//             </button>

//             {/* Editar servicios */}
//             <button
//               onClick={() => onEdit(user.id)}
//               className="flex items-center justify-center w-8 h-8 rounded-md bg-sky-600 hover:bg-sky-500 transition"
//               title="Asignar servicios"
//             >
//               <Pencil size={18} className="text-white" />
//             </button>
//           </div>
//         );
//       },
//     },
//   ];
// }

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { UserTableRow } from "./types/users";
import { UserPresenceStatus } from "@/lib/userPresence";
import { formatLastActivity } from "./lib/formatLastActivity";
import { presenceBadge } from "@/lib/presenceBadge";

interface BuildColumnsArgs {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
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
    // ───────────────────────────────
    {
      accessorKey: "role",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="text-base font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
    // Servicios
    // ───────────────────────────────
    {
      accessorKey: "serviceCodes",
      header: () => <div className="text-center">Servicios</div>,
      cell: ({ row }) => {
        const codes = row.getValue("serviceCodes") as string[];

        return (
          <div className="flex justify-center gap-1 flex-wrap">
            {codes.length > 0 ? (
              codes.map((code) => (
                <Badge
                  key={code}
                  variant="secondary"
                  className="px-3 py-1 tracking-wide"
                >
                  {code}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">—</span>
            )}
          </div>
        );
      },
    },

    // ───────────────────────────────
    // Estado (presencia)
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
      <div className="text-center text-sm text-muted-foreground">
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
            <button
              onClick={() => onView(user.id)}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
              title="Ver usuario"
            >
              <Eye size={18} className="text-white" />
            </button>

            <button
              onClick={() => onEdit(user.id)}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-sky-600 hover:bg-sky-500 transition"
              title="Asignar servicios"
            >
              <Pencil size={18} className="text-white" />
            </button>
          </div>
        );
      },
    },
  ];
}
