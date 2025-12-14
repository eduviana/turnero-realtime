"use client";

import {
  FormProvider,
  Controller,
  UseFormReturn,
} from "react-hook-form";

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

import { AffiliateFiltersForm } from "../schemas/affiliateFiltersSchema";

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
}

export function AffiliatesFilters({
  form,
  loading,
  onSubmit,
  onReset,
  provinces,
  cities,
}: Props) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedProvinceId = watch("provinceId");

  const filteredCities = selectedProvinceId
    ? cities.filter((city) => city.provinceId === selectedProvinceId)
    : [];

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Filtros de búsqueda</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* DNI */}
              <div>
                <Controller
                  name="dni"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="DNI" />
                  )}
                />
                {errors.dni && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.dni.message}
                  </p>
                )}
              </div>

              {/* Organización (string por ahora) */}
              <div>
                <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Organización" />
                  )}
                />
                {errors.organization && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.organization.message}
                  </p>
                )}
              </div>

              {/* Estado */}
              <div>
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
                        <SelectValue placeholder="Estado" />
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
                  <p className="text-sm text-red-600 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Provincia */}
              <div>
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
                        <SelectValue placeholder="Seleccionar provincia" />
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
                  <p className="text-sm text-red-600 mt-1">
                    {errors.provinceId.message}
                  </p>
                )}
              </div>

              {/* Ciudad */}
              <div>
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
                              ? "Seleccionar ciudad"
                              : "Seleccione una provincia primero"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCities.map((city) => (
                          <SelectItem
                            key={city.id}
                            value={String(city.id)}
                          >
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.cityId && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.cityId.message}
                  </p>
                )}
              </div>

              {/* Motivo */}
              <div>
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
                        <SelectValue placeholder="Motivo" />
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
                  <p className="text-sm text-red-600 mt-1">
                    {errors.statusReason.message}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onReset}
                disabled={loading}
              >
                Limpiar filtros
              </Button>

              <Button type="submit" disabled={loading}>
                Generar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}