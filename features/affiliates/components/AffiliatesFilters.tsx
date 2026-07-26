"use client";

import { FormProvider, Controller, UseFormReturn } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, X } from "lucide-react";

import { AffiliateFiltersForm } from "../schemas/affiliateFiltersSchema";
import { useOrganizations } from "@/features/organizations/hooks/useOrganizations";

type ProvinceOption = {
  id: number;
  name: string;
};

type CityOption = {
  id: number;
  name: string;
  provinceId: number;
};

interface Props {
  form: UseFormReturn<AffiliateFiltersForm>;
  loading: boolean;
  onSubmit: () => void;
  onReset: () => void;
  provinces: ProvinceOption[];
  cities: CityOption[];
  onClose?: () => void;
}

export function AffiliatesFilters({
  form,
  loading,
  onSubmit,
  onReset,
  provinces,
  cities,
  onClose,
}: Props) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const { organizations } = useOrganizations();

  const selectedProvinceId = watch("provinceId");

  const filteredCities = selectedProvinceId
    ? cities.filter((city) => city.provinceId === selectedProvinceId)
    : [];

  return (
    <FormProvider {...form}>
      <Card className="overflow-hidden rounded-tl-xl rounded-bl-xl rounded-tr-none rounded-br-none border-0 py-0 shadow-xl h-full">
        {/* HEADER */}
        <CardHeader className="bg-[#1e293b] p-0 gap-0">
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-4">
              <SlidersHorizontal className="h-5 w-5 shrink-0 text-white" />

              <CardTitle className="m-0 text-lg font-bold leading-none text-white">
                Filtros de búsqueda
              </CardTitle>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-white/60 hover:text-white transition-colors rounded hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); onClose?.(); }} className="flex flex-col gap-6">
            {/* DNI */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                DNI
              </Label>

              <Controller
                name="dni"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Ingrese DNI" />
                )}
              />

              {errors.dni && (
                <p className="text-xs text-red-600">{errors.dni.message}</p>
              )}
            </div>

            {/* Organización */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Organización
              </Label>

              <Controller
                name="organizationId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione organización" />
                    </SelectTrigger>

                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={String(org.id)}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Estado */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Estado
              </Label>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) =>
                      field.onChange(value || undefined)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione estado" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ACTIVE">Activo</SelectItem>

                      <SelectItem value="SUSPENDED">Suspendido</SelectItem>

                      <SelectItem value="INACTIVE">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && (
                <p className="text-xs text-red-600">{errors.status.message}</p>
              )}
            </div>

            {/* Provincia */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Provincia
              </Label>

              <Controller
                name="provinceId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => {
                      field.onChange(value ? Number(value) : undefined);

                      setValue("cityId", undefined);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione provincia" />
                    </SelectTrigger>

                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem
                          key={province.id}
                          value={String(province.id)}
                        >
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.provinceId && (
                <p className="text-xs text-red-600">
                  {errors.provinceId.message}
                </p>
              )}
            </div>

            {/* Ciudad */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Ciudad
              </Label>

              <Controller
                name="cityId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    disabled={!selectedProvinceId}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          selectedProvinceId
                            ? "Seleccione ciudad"
                            : "Seleccione provincia primero"
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {filteredCities.map((city) => (
                        <SelectItem key={city.id} value={String(city.id)}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.cityId && (
                <p className="text-xs text-red-600">{errors.cityId.message}</p>
              )}
            </div>

            {/* Motivo */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Motivo
              </Label>

              <Controller
                name="statusReason"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) =>
                      field.onChange(value || undefined)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione motivo" />
                    </SelectTrigger>

                    <SelectContent>
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

              {errors.statusReason && (
                <p className="text-xs text-red-600">
                  {errors.statusReason.message}
                </p>
              )}
            </div>

            <Separator />

            {/* Acciones */}
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={loading}>
                Buscar
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onReset}
                disabled={loading}
              >
                Limpiar filtros
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
