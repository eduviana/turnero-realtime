"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createAffiliateSchema,
  CreateAffiliateInput,
} from "../schemas/affiliate-schema";
import { City, Province } from "../types/affiliations";
import { Organization } from "@clerk/nextjs/server";
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";

export function AffiliationsArea() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createAffiliateSchema),
    defaultValues: {
      dni: "",
      firstName: "",
      lastName: "",
      email: "",
      provinceId: undefined,
      cityId: undefined,
      organizationId: undefined,
    },
  });

  const provinceId = watch("provinceId");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const { service } = useOperatorService();
  const { actOnCurrent } = useTurnQueue(service!.id);

  /* Provincias */
  useEffect(() => {
    fetch("/api/locations/provinces")
      .then((res) => res.json())
      .then((json) => setProvinces(json.data ?? []))
      .catch(() => setProvinces([]));
  }, []);

  /* Ciudades */
  useEffect(() => {
    if (!provinceId) {
      setCities([]);
      return;
    }

    fetch(`/api/locations/cities?provinceId=${provinceId}`)
      .then((res) => res.json())
      .then((json) => setCities(json.data ?? []))
      .catch(() => setCities([]));
  }, [provinceId]);

  /* Organizaciones */
  useEffect(() => {
    fetch("/api/organizations")
      .then((res) => res.json())
      .then((json) => setOrganizations(json.data ?? []))
      .catch(() => setOrganizations([]));
  }, []);

  const onSubmit = async (data: CreateAffiliateInput) => {
    try {
      const res = await fetch("/api/affiliate/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.error ?? "No se pudo crear el afiliado");
      }

      toast.success("Afiliado creado correctamente");
      reset();
      // ✅ CERRAR TURNO
      await actOnCurrent("COMPLETE");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Ocurrió un error inesperado",
      );
    }
  };

  return (
    <section className="max-w-5xl bg-white p-6 rounded-xl border">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Registrar nuevo afiliado
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Datos personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["dni", "DNI", "Ingrese DNI"],
            ["firstName", "Nombre", "Ingrese nombre"],
            ["lastName", "Apellido", "Ingrese apellido"],
            ["email", "Email", "ejemplo@correo.com"],
          ].map(([name, label, placeholder]) => (
            <div key={name} className="space-y-2">
              <Label>{label}</Label>
              <Input
                {...register(name as any)}
                placeholder={placeholder}
                className="w-full h-11"
              />
              {errors[name as keyof typeof errors] && (
                <p className="text-xs text-red-600">
                  {errors[name as keyof typeof errors]?.message as string}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Provincia</Label>
            <select
              {...register("provinceId")}
              defaultValue=""
              className="w-full h-11 px-4 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            >
              <option value="" disabled>
                Seleccionar provincia
              </option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {errors.provinceId && (
              <p className="text-xs text-red-600">
                {errors.provinceId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Ciudad</Label>
            <select
              {...register("cityId")}
              disabled={!provinceId}
              className="w-full h-11 px-4 rounded-lg border disabled:opacity-50"
            >
              <option value="">Seleccionar ciudad</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <p className="text-xs text-red-600">{errors.cityId.message}</p>
            )}
          </div>
        </div>

        {/* Organización */}
        <div className="space-y-2">
          <Label>Organización</Label>
          <select
            {...register("organizationId", { valueAsNumber: true })}
            className="w-full h-11 px-4 rounded-lg border"
          >
            <option value="">Sin organización</option>
            {organizations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        {/* Acción */}
        <div className="pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="px-8 py-3 text-base font-semibold shadow-lg"
          >
            Crear afiliado
          </Button>
        </div>
      </form>
    </section>
  );
}
