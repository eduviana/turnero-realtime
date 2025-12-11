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
import { UserDataViewModal } from "../types/users";
import { UserViewSkeleton } from "./UserViewSkeleton";

interface ViewUserModalProps {
  userId: string | null;
  onClose: () => void;
}

// Altura consistente para skeleton y contenido final.
// Ajustala si tu modal tiene otra altura real.
const CARD_HEIGHT_CLASS = "h-[28rem]";

export function ViewUserModal({ userId, onClose }: ViewUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDataViewModal | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      <DialogContent className="max-w-xl w-full">
        <DialogHeader>
          <DialogTitle>Detalles del usuario</DialogTitle>
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
          <Card className={`overflow-hidden w-full ${CARD_HEIGHT_CLASS}`}>
            {/* HEADER */}
            <CardHeader className="flex flex-col items-center gap-4 p-6 bg-muted/30 border-b">
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

                <Badge
                  variant="outline"
                  className="uppercase tracking-wide mt-2"
                >
                  {user.role}
                </Badge>
              </div>
            </CardHeader>

            {/* BODY */}
            <CardContent className="px-6 space-y-4 overflow-auto">
              {/* Email */}
              <div className="space-y-1">
                <Label>Email</Label>
                <div className="text-sm text-muted-foreground">
                  {user.email ?? "-"}
                </div>
              </div>

              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Nombre</Label>
                  <div className="text-sm text-muted-foreground">
                    {user.firstName ?? "-"}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Apellido</Label>
                  <div className="text-sm text-muted-foreground">
                    {user.lastName ?? "-"}
                  </div>
                </div>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Fecha de alta</Label>
                  <div className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Última actualización</Label>
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