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
import { AffiliateDataViewModal } from "../types/affiliate";
import { getAffiliateById } from "../services/getAffiliateById";
import { AffiliateViewSkeleton } from "./AffiliateViewSkeleton";

interface ViewUserModalProps {
  affiliateId: string | null;
  onClose: () => void;
}



export function ViewAffiliateModal({ affiliateId, onClose }: ViewUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [affiliate, setAffiliate] = useState<AffiliateDataViewModal | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!affiliateId) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAffiliateById(affiliateId);
        setAffiliate(data);
      } catch (err: any) {
        setError(err.message ?? "Error al cargar el afiliado");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [affiliateId]);

  const statusStyles: Record<string, string> = {
    ACTIVE: "bg-emerald-700",
    SUSPENDED: "bg-red-700",
    INACTIVE: "bg-yellow-700",
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Detalles del afiliado</DialogTitle>
        </DialogHeader>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <AffiliateViewSkeleton />
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center py-8 text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && affiliate && (
          <div className="space-y-6">
            {/* HEADER */}
            <Card>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-semibold">
                    {affiliate.firstName} {affiliate.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    DNI {affiliate.dni}
                    {affiliate.affiliateNumber &&
                      ` · Nº ${affiliate.affiliateNumber}`}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {affiliate.organization ?? "-"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={`uppercase tracking-wide px-4 py-2 text-sm text-white ${statusStyles[affiliate.status] ?? ""}`}>
                  {affiliate.status}
                </Badge>
              </CardContent>
            </Card>

            {/* DATOS PERSONALES */}
            <Card>
              <CardHeader className="pb-2">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                  Datos personales
                </h4>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Teléfono</Label>
                  <div className="text-sm text-muted-foreground">
                    {affiliate.phone ?? "-"}
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <div className="text-sm text-muted-foreground">
                    {affiliate.email ?? "-"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* UBICACIÓN */}
            <Card>
              <CardHeader className="pb-2">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                  Ubicación
                </h4>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Provincia</Label>
                  <div className="text-sm text-muted-foreground">
                    {affiliate.province}
                  </div>
                </div>

                <div>
                  <Label>Ciudad</Label>
                  <div className="text-sm text-muted-foreground">
                    {affiliate.city}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ESTADO ADMINISTRATIVO */}
            <Card>
              <CardHeader className="pb-2">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                  Estado administrativo
                </h4>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Estado</Label>
                  <div className="text-sm text-muted-foreground">
                    {affiliate.status}
                  </div>
                </div>

                <div>
                  <Label>Motivo</Label>
                  <div className="text-sm text-muted-foreground">
                    {affiliate.statusReason}
                  </div>
                </div>

                <div>
                  <Label>Fecha de alta</Label>
                  <div className="text-sm text-muted-foreground">
                    {affiliate.activatedAt
                      ? new Date(affiliate.activatedAt).toLocaleDateString()
                      : "-"}
                  </div>
                </div>

                <div>
                  <Label>Última actualización</Label>
                  <div className="text-sm text-muted-foreground">
                    {new Date(affiliate.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
