"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "../services/getUserById";
import { UserWithStatus } from "../types/users";
import { UserViewSkeleton } from "./UserViewSkeleton";
import { formatLastActivity } from "../lib/formatLastActivity";

interface ViewUserModalProps {
  userId: string | null;
  onClose: () => void;
}

// Altura consistente para skeleton y contenido final.
// Ajustala si tu modal tiene otra altura real.
const CARD_HEIGHT_CLASS = "h-[24rem]";

export function ViewUserModal({ userId, onClose }: ViewUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserWithStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isOnline = user?.userStatus?.isOnline ?? false;
  const lastActivityAt = user?.userStatus?.lastActivityAt
    ? new Date(user.userStatus.lastActivityAt)
    : null;

  console.log(lastActivityAt, "PPPPPPPPPPPPPPPPP");

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
      <DialogContent className="w-full px-10 py-8 gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del usuario</DialogTitle>
        </DialogHeader>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center">
            <div className="w-full">
              <UserViewSkeleton className={CARD_HEIGHT_CLASS} />
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center py-6 text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && user && (
          // <Card className={`overflow-hidden w-full p-0 ${CARD_HEIGHT_CLASS}`}>
          // <Card className={`overflow-hidden w-full p-0`}>
          //   {/* HEADER */}
          //   <CardHeader className="flex flex-col items-center gap-4 bg-muted/30 border-b">
          //     {user.profileImage ? (
          //       <img
          //         src={user.profileImage}
          //         alt="Foto de perfil"
          //         className="w-24 h-24 rounded-full object-cover border shadow-sm"
          //       />
          //     ) : (
          //       <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-sm border shadow-sm">
          //         Sin foto
          //       </div>
          //     )}

          //     <div className="text-center">
          //       <p className="font-semibold text-xl">
          //         {user.firstName} {user.lastName}
          //       </p>

          //       {user.email && (
          //         <p className="text-sm text-muted-foreground">{user.email}</p>
          //       )}

          //       <Badge
          //         variant="default"
          //         className="uppercase tracking-wide mt-2"
          //       >
          //         {user.role}
          //       </Badge>
          //     </div>
          //   </CardHeader>
          <Card className="overflow-hidden w-full p-0">
            {/* HEADER */}
            <CardHeader className="bg-muted/30 p-0">
              <div className="flex flex-col items-center gap-2 py-4 border-b">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Foto de perfil"
                    className="w-24 h-24 rounded-full object-cover border shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-sm border shadow-sm">
                    Sin foto
                  </div>
                )}

                <div className="text-center">
                  <p className="font-semibold text-xl">
                    {user.firstName} {user.lastName}
                  </p>

                  {user.email && (
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  )}

                  <Badge
                    variant="default"
                    className="uppercase tracking-wide mt-2"
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {/* BODY */}
            <CardContent className="px-0 space-y-4 overflow-auto py-4">
              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 text-center">
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

                <div className="space-y-1 text-center">
                  <Label className="block text-center">Última actividad</Label>
                  <div className="text-center text-sm text-muted-foreground">
                    {formatLastActivity(lastActivityAt)}
                  </div>
                </div>

                <div className="space-y-1 text-center">
                  <Label className="block text-center">Fecha de alta</Label>
                  <div className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-1 text-center">
                  <Label className="block text-center">
                    Última actualización
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
