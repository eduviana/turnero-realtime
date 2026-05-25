"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { AffiliateDataViewModal } from "../types/affiliate";
import { getAffiliateById } from "../services/getAffiliateById";
import { AffiliateViewSkeleton } from "./AffiliateViewSkeleton";

interface ViewUserModalProps {
  affiliateId: string | null;
  onClose: () => void;
}

export function ViewAffiliateModal({
  affiliateId,
  onClose,
}: ViewUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [affiliate, setAffiliate] = useState<AffiliateDataViewModal | null>(
    null,
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
    ACTIVE: "bg-emerald-600",
    SUSPENDED: "bg-amber-500",
    INACTIVE: "bg-red-700",
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="
        max-w-4xl
        w-full
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
        <DialogTitle className="sr-only">Detalles del Afiliado</DialogTitle>

        {/* HEADER */}
        <div className="relative flex items-center justify-between bg-foreground px-6 py-6">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Detalles del Afiliado
          </h2>

          <DialogClose className="cursor-pointer text-white transition-opacity hover:opacity-70">
            <X className="size-5" />
          </DialogClose>
        </div>

        {/* BODY */}
        <div className="bg-white">
          {/* LOADING */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <AffiliateViewSkeleton />
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="py-8 text-center font-medium text-red-500">
              {error}
            </div>
          )}

          {/* CONTENT */}
          {!loading && !error && affiliate && (
            <div
              className="
              flex flex-col gap-3
              bg-gradient-radial
              from-white
              via-slate-100
              to-slate-200/90
              px-4 py-4 pb-8
            "
            >
              {/* ===================================================== */}
              {/* SECCIÓN 1 — PERFIL */}
              {/* ===================================================== */}
              <section className="rounded-2xl border border-slate-200/70 bg-white/70 px-6 py-6 shadow-sm backdrop-blur-sm">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-slate-500" />

                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                        Perfil del afiliado
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {affiliate.firstName} {affiliate.lastName}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      DNI {affiliate.dni}
                      {affiliate.affiliateNumber &&
                        ` · Nº ${affiliate.affiliateNumber}`}
                    </p>

                    <p className="text-sm text-slate-500">
                      {affiliate.organization ?? "-"}
                    </p>
                  </div>

                  <span
                    className={`
                    inline-flex items-center rounded-full
                    px-4 py-2 text-xs font-bold uppercase
                    tracking-wider text-white
                    ${statusStyles[affiliate.status] ?? "bg-gray-400"}
                  `}
                  >
                    {affiliate.status}
                  </span>
                </div>
              </section>

              {/* ===================================================== */}
              {/* SECCIÓN 2 — DATOS PERSONALES */}
              {/* ===================================================== */}
              <section className="rounded-2xl border border-slate-200/70 bg-white/70 px-6 py-6 shadow-sm backdrop-blur-sm">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-500" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Datos personales
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Teléfono
                    </span>

                    <p className="text-sm font-medium text-slate-700">
                      {affiliate.phone ?? "-"}
                    </p>
                  </div>

                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Email
                    </span>

                    <p className="break-all text-sm font-medium text-slate-700">
                      {affiliate.email ?? "-"}
                    </p>
                  </div>
                </div>
              </section>

              {/* ===================================================== */}
              {/* SECCIÓN 3 — UBICACIÓN */}
              {/* ===================================================== */}
              <section className="rounded-2xl border border-sky-200/70 bg-sky-50/70 px-6 py-6 shadow-sm backdrop-blur-sm">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sky-500" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Ubicación
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Provincia
                    </span>

                    <p className="text-sm font-medium text-slate-700">
                      {affiliate.province ?? "-"}
                    </p>
                  </div>

                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Ciudad
                    </span>

                    <p className="text-sm font-medium text-slate-700">
                      {affiliate.city ?? "-"}
                    </p>
                  </div>
                </div>
              </section>

              {/* ===================================================== */}
              {/* SECCIÓN 4 — ESTADO ADMINISTRATIVO */}
              {/* ===================================================== */}
              <section className="rounded-2xl border border-violet-200/60 bg-violet-50/50 px-6 py-6 shadow-sm backdrop-blur-sm">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Estado administrativo
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  {/* Fila 1 */}
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Estado
                    </span>

                    <p className="text-sm font-medium text-slate-700">
                      {affiliate.status}
                    </p>
                  </div>

                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Motivo
                    </span>

                    <p className="text-sm font-medium text-slate-700">
                      {affiliate.statusReason ?? "-"}
                    </p>
                  </div>

                  {/* Fila 2 */}
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Fecha de alta
                    </span>

                    <p className="text-sm font-medium text-slate-700">
                      {affiliate.activatedAt
                        ? new Date(affiliate.activatedAt).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Última actualización
                    </span>

                    <p className="text-sm font-medium text-slate-700">
                      {new Date(affiliate.updatedAt).toLocaleDateString()}
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
