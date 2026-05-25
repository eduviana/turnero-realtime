"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AffiliateDataViewModal,
  AffiliateEditFormData,
  AffiliateTableRow,
} from "../types/affiliate";
import { getAffiliateById } from "../services/getAffiliateById";
import { updateAffiliate } from "../services/updateAffiliate";
import { useLocations } from "../hooks/useLocations";
import { AffiliateEditSkeleton } from "./AffiliateEditSkeleton";
import {
  affiliateEditSchema,
  AffiliateEditSchema,
} from "../schemas/affiliateEdit";

interface EditAffiliateModalProps {
  affiliateId: string;
  onClose: () => void;
  onUpdated: (affiliate: AffiliateTableRow) => void;
}

export function EditAffiliateModal({
  affiliateId,
  onClose,
  onUpdated,
}: EditAffiliateModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [createdAt, setCreatedAt] = useState<string>("");

  const { provinces, cities, loading: locationsLoading } = useLocations();

  const form = useForm<AffiliateEditSchema>({
    resolver: zodResolver(affiliateEditSchema),
    mode: "onSubmit",
  });

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const selectedProvinceId = watch("provinceId");

  const filteredCities = cities.filter(
    (city) => city.provinceId === selectedProvinceId,
  );

  useEffect(() => {
    const loadAffiliate = async () => {
      try {
        setLoading(true);
        setError(null);

        const affiliate: AffiliateDataViewModal =
          await getAffiliateById(affiliateId);

        setCreatedAt(new Date(affiliate.createdAt).toLocaleDateString("es-AR"));

        form.reset({
          dni: affiliate.dni,
          firstName: affiliate.firstName,
          lastName: affiliate.lastName,
          phone: affiliate.phone,
          email: affiliate.email,
          provinceId: affiliate.provinceId,
          cityId: affiliate.cityId,
          status: affiliate.status,
          statusReason: affiliate.statusReason,
        });
      } catch (err: any) {
        setError(err?.message ?? "Error al cargar afiliado");
      } finally {
        setLoading(false);
      }
    };

    loadAffiliate();
  }, [affiliateId, form]);

  const onSubmit = async (values: AffiliateEditSchema) => {
    try {
      setSubmitting(true);
      setError(null);

      const updated = await updateAffiliate(
        affiliateId,
        values as AffiliateEditFormData,
      );

      onUpdated(updated);
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar cambios");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || locationsLoading) {
    return <AffiliateEditSkeleton />;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="
        w-full
        max-w-4xl
        gap-0
        overflow-hidden
        rounded-lg
        border-0
        bg-foreground
        p-0
        shadow-2xl
        outline
        outline-1
        outline-slate-900
      "
      >
        <DialogTitle className="sr-only">Editar afiliado</DialogTitle>

        {/* HEADER */}
        <div className="relative flex items-center justify-between bg-foreground px-6 py-6">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Editar afiliado
          </h2>

          <DialogClose className="cursor-pointer text-white transition-opacity hover:opacity-70">
            <X className="size-5" />
          </DialogClose>
        </div>

        {/* BODY */}
        <div className="bg-white">
          {error && (
            <div className="px-6 pt-4 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <form
            id="edit-affiliate-form"
            onSubmit={form.handleSubmit(onSubmit)}
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
            {/* SECCIÓN 1 — DATOS PERSONALES */}
            {/* ===================================================== */}
            <section className="rounded-2xl border border-slate-200/70 bg-white/70 px-6 py-6 shadow-sm backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Datos personales
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Nombre
                  </Label>

                  <Input
                    {...register("firstName")}
                    className="mt-1.5 bg-white/80"
                  />

                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Apellido
                  </Label>

                  <Input
                    {...register("lastName")}
                    className="mt-1.5 bg-white/80"
                  />

                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Teléfono
                  </Label>

                  <Input
                    {...register("phone")}
                    className="mt-1.5 bg-white/80"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Email
                  </Label>

                  <Input
                    type="email"
                    {...register("email")}
                    className="mt-1.5 bg-white/80"
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    DNI
                  </Label>

                  <Input {...register("dni")} className="mt-1.5 bg-white/80" />

                  {errors.dni && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.dni.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ===================================================== */}
            {/* SECCIÓN 2 — UBICACIÓN */}
            {/* ===================================================== */}
            <section className="rounded-2xl border border-sky-200/70 bg-sky-50/20 px-6 py-6 shadow-sm backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-sky-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Ubicación
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Provincia */}
                <div className="w-full">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Provincia
                  </Label>

                  <Controller
                    name="provinceId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(v) => {
                          field.onChange(Number(v));
                          form.setValue("cityId", undefined as any);
                        }}
                      >
                        <SelectTrigger className="mt-1.5 w-full bg-white/80">
                          <SelectValue placeholder="Seleccionar provincia" />
                        </SelectTrigger>

                        <SelectContent>
                          {provinces.map((p) => (
                            <SelectItem key={p.id} value={String(p.id)}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.provinceId && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.provinceId.message}
                    </p>
                  )}
                </div>

                {/* Ciudad */}
                <div className="w-full">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Ciudad
                  </Label>

                  <Controller
                    name="cityId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(v) => field.onChange(Number(v))}
                        disabled={!selectedProvinceId}
                      >
                        <SelectTrigger className="mt-1.5 w-full bg-white/80">
                          <SelectValue placeholder="Seleccionar ciudad" />
                        </SelectTrigger>

                        <SelectContent>
                          {filteredCities.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.cityId && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.cityId.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ===================================================== */}
            {/* SECCIÓN 3 — ESTADO */}
            {/* ===================================================== */}
            <section className="rounded-2xl border border-violet-200/60 bg-violet-50/50 px-6 py-6 shadow-sm backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Estado administrativo
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Estado */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Estado
                  </Label>

                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-1.5 bg-white/80">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="ACTIVE">Activo</SelectItem>
                          <SelectItem value="SUSPENDED">Suspendido</SelectItem>
                          <SelectItem value="INACTIVE">Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Motivo */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Motivo
                  </Label>

                  <Controller
                    name="statusReason"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-1.5 bg-white/80">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="NONE">Ninguno</SelectItem>
                          <SelectItem value="DEBT">Deuda</SelectItem>
                          <SelectItem value="MISSING_DOCUMENTATION">
                            Falta documentación
                          </SelectItem>
                          <SelectItem value="VOLUNTARY_LEAVE">
                            Baja voluntaria
                          </SelectItem>
                          <SelectItem value="ADMIN_DECISION">
                            Decisión administrativa
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Fecha */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Fecha de creación
                  </Label>

                  <Input
                    value={createdAt}
                    disabled
                    className="mt-1.5 bg-slate-100"
                  />
                </div>
              </div>
            </section>

            {/* ACCIONES */}
            <section className="rounded-2xl border border-slate-200/70 bg-white/70 px-6 py-5 shadow-sm backdrop-blur-sm">
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  form="edit-affiliate-form"
                  disabled={submitting}
                >
                  {submitting ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </section>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
