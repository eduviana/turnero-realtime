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
import { useServices } from "@/features/service/hooks/useServices";

import { calculateUserPresence, UserPresenceStatus } from "@/lib/userPresence";
import { presenceBadge } from "@/lib/presenceBadge";

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

  const {
    services,
    loading: loadingServices,
    error: errorServices,
  } = useServices();

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
          <Card className="overflow-hidden w-full p-0 gap-0">
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
            <CardContent className="px-0 space-y-6 overflow-auto py-4">
              {/* Servicios asociados */}
              <div className="space-y-2">
                <Label className="block text-center">Servicios asociados</Label>

                {user.services.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground">
                    El usuario no tiene servicios asignados
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.services
                      .slice()
                      .sort((a, b) => (a.isPrimary ? -1 : 1))
                      .map((assignment) => (
                        <Badge
                          key={assignment.service.id}
                          variant={
                            assignment.isPrimary ? "default" : "secondary"
                          }
                          className="flex items-center gap-1"
                        >
                          {assignment.service.name}
                          {assignment.isPrimary && (
                            <span className="text-xs opacity-80">
                              (Primary)
                            </span>
                          )}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
              {/* Información general */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 text-center">
                  <Label className="block text-center">Estado</Label>
                  <div className="flex justify-center">
                    {presenceBadge(presence.status)}
                  </div>
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
