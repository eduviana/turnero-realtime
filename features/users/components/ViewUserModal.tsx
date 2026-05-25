// "use client";

// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { X } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";

// import { getUserById } from "../services/getUserById";
// import { UserWithStatus } from "../types/users";
// import { UserViewSkeleton } from "./UserViewSkeleton";
// import { formatLastActivity } from "../lib/formatLastActivity";

// import { calculateUserPresence } from "@/lib/userPresence";
// import { presenceBadge } from "@/lib/presenceBadge";

// interface ViewUserModalProps {
//   userId: string | null;
//   onClose: () => void;
// }

// export function ViewUserModal({ userId, onClose }: ViewUserModalProps) {
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState<UserWithStatus | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const lastActivityAt = user?.userStatus?.lastActivityAt
//     ? new Date(user.userStatus.lastActivityAt)
//     : null;

//   const presence = calculateUserPresence(lastActivityAt);

//   useEffect(() => {
//     if (!userId) return;

//     const load = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await getUserById(userId);
//         setUser(data);
//       } catch (err: any) {
//         setError(err.message ?? "Error al cargar el usuario");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [userId]);

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent
//         showCloseButton={false}
//         className="
//     max-w-lg
//     gap-0
//     p-0
//     overflow-hidden
//     rounded-lg
//     border-0
//     bg-foreground
//     shadow-2xl
//     outline-1
//     outline-slate-900
//   "
//       >
//         {/* HEADER */}
//         <div className="relative bg-foreground px-6 py-6 flex items-center justify-between">
//           <DialogTitle className="m-0 text-xl font-semibold leading-none text-white">
//             Detalles del usuario
//           </DialogTitle>

//           <DialogClose className="text-white opacity-100 hover:opacity-70 transition-opacity cursor-pointer">
//             <X className="size-5" />
//           </DialogClose>
//         </div>

//         {/* BODY */}
//         <div className="bg-white">
//           {/* LOADING */}
//           {loading && (
//             <div className="p-6">
//               <UserViewSkeleton className="h-[668px]" />
//             </div>
//           )}

//           {/* ERROR */}
//           {!loading && error && (
//             <div className="p-6 text-center text-red-500 font-medium">
//               {error}
//             </div>
//           )}

//           {/* CONTENT */}
//           {!loading && !error && user && (
//             <div className="pt-4 pb-8">
//               {/* SECCIÓN 1 — Perfil */}
//               <section className="mx-4 rounded-2xl bg-slate-50 border border-slate-200/70 px-6 py-8 flex flex-col items-center text-center">
//                 <div className="rounded-full mb-4">
//                   <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg ring-4 ring-white">
//                     {user.profileImage ? (
//                       <img
//                         src={user.profileImage}
//                         alt="Foto de perfil"
//                         className="w-24 h-24 rounded-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-slate-400 text-sm">Sin foto</span>
//                     )}
//                   </div>
//                 </div>

//                 <h3 className="text-2xl font-bold text-slate-900 leading-tight">
//                   {user.firstName} {user.lastName}
//                 </h3>

//                 {user.email && (
//                   <p className="text-sm text-slate-500 mt-1">{user.email}</p>
//                 )}

//                 <Badge className="mt-4 uppercase tracking-widest text-sm px-4 py-1.5 rounded bg-sidebar text-white">
//                   {user.role}
//                 </Badge>
//               </section>

//               {/* SECCIÓN 2 — Áreas */}
//               <section className="mx-4 mt-4 rounded-2xl bg-sky-50 border border-sky-100 px-6 py-6 text-center">
//                 <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-3">
//                   Áreas asociadas
//                 </span>

//                 {user.services.length === 0 ? (
//                   <p className="text-sm text-slate-400">Sin áreas asignadas</p>
//                 ) : (
//                   <div className="flex flex-wrap justify-center gap-2">
//                     {user.services
//                       .slice()
//                       .sort((a, b) => (a.isPrimary ? -1 : 1))
//                       .map((assignment) => (
//                         <span
//                           key={assignment.service.id}
//                           className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full"
//                         >
//                           {assignment.service.name}
//                         </span>
//                       ))}
//                   </div>
//                 )}
//               </section>

//               {/* SECCIÓN 3 — Info */}
//               <section className="mx-4 mt-4 rounded-2xl bg-slate-50 border border-slate-200/70 px-6 py-7">
//                 <div className="grid grid-cols-2 gap-y-7 gap-x-4 text-center">
//                   <div>
//                     <Label className="text-xs uppercase tracking-wider text-slate-700 font-semibold block mb-2">
//                       Estado
//                     </Label>

//                     <div className="flex justify-center">
//                       {presenceBadge(presence.status)}
//                     </div>
//                   </div>

//                   <div>
//                     <Label className="text-xs uppercase tracking-wider text-slate-700 font-semibold block mb-2">
//                       Última actividad
//                     </Label>

//                     <p className="text-sm font-medium text-slate-700">
//                       {formatLastActivity(lastActivityAt)}
//                     </p>
//                   </div>

//                   <div>
//                     <Label className="text-xs uppercase tracking-wider text-slate-700 font-semibold block mb-2">
//                       Fecha de alta
//                     </Label>

//                     <p className="text-sm font-medium text-slate-700">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div>
//                     <Label className="text-xs uppercase tracking-wider text-slate-700 font-semibold block mb-2">
//                       Última actualización
//                     </Label>

//                     <p className="text-sm font-medium text-slate-700">
//                       {new Date(user.updatedAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { getUserById } from "../services/getUserById";
import { UserWithStatus } from "../types/users";
import { UserViewSkeleton } from "./UserViewSkeleton";
import { formatLastActivity } from "../lib/formatLastActivity";

import { calculateUserPresence } from "@/lib/userPresence";
import { presenceBadge } from "@/lib/presenceBadge";

interface ViewUserModalProps {
  userId: string | null;
  onClose: () => void;
}

export function ViewUserModal({ userId, onClose }: ViewUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserWithStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastActivityAt = user?.userStatus?.lastActivityAt
    ? new Date(user.userStatus.lastActivityAt)
    : null;

  const presence = calculateUserPresence(lastActivityAt);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err: any) {
        setError(err.message ?? "Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="
        max-w-lg
        gap-0
        p-0
        overflow-hidden
        rounded-lg
        border-0
        bg-foreground
        shadow-2xl
        outline
        outline-1
        outline-slate-900
      "
      >
        {/* HEADER */}
        <div className="relative flex items-center justify-between bg-foreground px-6 py-6">
          <DialogTitle className="m-0 text-xl font-semibold leading-none text-white">
            Detalles del usuario
          </DialogTitle>

          <DialogClose className="cursor-pointer text-white opacity-100 transition-opacity hover:opacity-70">
            <X className="size-5" />
          </DialogClose>
        </div>

        {/* BODY */}
        <div className="bg-white">
          {/* LOADING */}
          {loading && (
            <div className="p-6">
              <UserViewSkeleton className="h-[668px]" />
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="p-6 text-center font-medium text-red-500">
              {error}
            </div>
          )}

          {/* CONTENT */}
          {!loading && !error && user && (
            <div
              className="
    flex flex-col gap-2 px-4 py-4 pb-8
    bg-gradient-to-b
    from-slate-200
    via-slate-10
    to-white
  "
            >
              {/* SECCIÓN 1 — Perfil */}
              <section className="flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white/40 px-6 py-8 text-center backdrop-blur-[1px]">
                <div className="mb-4 rounded-full">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Foto de perfil"
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-slate-400">Sin foto</span>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold leading-tight text-slate-900">
                  {user.firstName} {user.lastName}
                </h3>

                {user.email && (
                  <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                )}

                <Badge className="mt-4 rounded bg-sidebar px-4 py-1.5 text-sm uppercase tracking-widest text-white">
                  {user.role}
                </Badge>
              </section>

              {/* SECCIÓN 2 — Áreas */}
              <section className="rounded-2xl border border-slate-200/70 bg-white/35 px-6 py-6 text-center backdrop-blur-[1px]">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Áreas asociadas
                </span>

                {user.services.length === 0 ? (
                  <p className="text-sm text-slate-400">Sin áreas asignadas</p>
                ) : (
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.services
                      .slice()
                      .sort((a, b) => (a.isPrimary ? -1 : 1))
                      .map((assignment) => (
                        <span
                          key={assignment.service.id}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
                        >
                          {assignment.service.name}
                        </span>
                      ))}
                  </div>
                )}
              </section>

              {/* SECCIÓN 3 — Info */}
              <section className="rounded-2xl border border-slate-200/70 bg-white/30 px-6 py-7 backdrop-blur-[1px]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-7 text-center">
                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-sky-900">
                      Estado
                    </Label>

                    <div className="flex justify-center">
                      {presenceBadge(presence.status)}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-sky-900">
                      Última actividad
                    </Label>

                    <p className="text-sm font-medium text-slate-700">
                      {formatLastActivity(lastActivityAt)}
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-sky-900">
                      Fecha de alta
                    </Label>

                    <p className="text-sm font-medium text-slate-700">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-sky-900">
                      Última actualización
                    </Label>

                    <p className="text-sm font-medium text-slate-700">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
