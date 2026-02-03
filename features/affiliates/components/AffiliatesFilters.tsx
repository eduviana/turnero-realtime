// "use client";

// import { FormProvider, Controller, UseFormReturn } from "react-hook-form";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { AffiliateFiltersForm } from "../schemas/affiliateFiltersSchema";
// import { useOrganizations } from "@/features/organizations/hooks/useOrganizations";

// type ProvinceOption = {
//   id: number;
//   name: string;
// };

// type CityOption = {
//   id: number;
//   name: string;
//   provinceId: number;
// };

// interface Props {
//   form: UseFormReturn<AffiliateFiltersForm>;
//   loading: boolean;
//   onSubmit: () => void;
//   onReset: () => void;
//   provinces: ProvinceOption[];
//   cities: CityOption[];
// }

// export function AffiliatesFilters({
//   form,
//   loading,
//   onSubmit,
//   onReset,
//   provinces,
//   cities,
// }: Props) {
//   const {
//     control,
//     watch,
//     setValue,
//     formState: { errors },
//   } = form;

//   const { organizations, organizationsLoading } = useOrganizations()

//   const selectedProvinceId = watch("provinceId");

//   const filteredCities = selectedProvinceId
//     ? cities.filter((city) => city.provinceId === selectedProvinceId)
//     : [];

//   return (
//     <FormProvider {...form}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Filtros de búsqueda</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={onSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* DNI */}
//               <div>
//                 <Controller
//                   name="dni"
//                   control={control}
//                   render={({ field }) => <Input {...field} placeholder="DNI" />}
//                 />
//                 {errors.dni && (
//                   <p className="text-sm text-red-600 mt-1">
//                     {errors.dni.message}
//                   </p>
//                 )}
//               </div>

//               {/* Organización (string por ahora) */}
//               <div>
//                 <Controller
//                   name="organizationId"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       value={field.value ? String(field.value) : ""}
//                       onValueChange={(value) =>
//                         field.onChange(value ? Number(value) : undefined)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Organización" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {organizations.map((org) => (
//                           <SelectItem key={org.id} value={String(org.id)}>
//                             {org.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {/* {errors.organization && (
//                   <p className="text-sm text-red-600 mt-1">
//                     {errors.organization.message}
//                   </p>
//                 )} */}
//               </div>

//               {/* Estado */}
//               <div>
//                 <Controller
//                   name="status"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       value={field.value ?? ""}
//                       onValueChange={(value) =>
//                         field.onChange(value || undefined)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Estado" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="ACTIVE">Activo</SelectItem>
//                         <SelectItem value="SUSPENDED">Suspendido</SelectItem>
//                         <SelectItem value="INACTIVE">Inactivo</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.status && (
//                   <p className="text-sm text-red-600 mt-1">
//                     {errors.status.message}
//                   </p>
//                 )}
//               </div>

//               {/* Provincia */}
//               <div>
//                 <Controller
//                   name="provinceId"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       value={field.value ? String(field.value) : ""}
//                       onValueChange={(value) => {
//                         field.onChange(value ? Number(value) : undefined);
//                         setValue("cityId", undefined);
//                       }}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Seleccionar provincia" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {provinces.map((province) => (
//                           <SelectItem
//                             key={province.id}
//                             value={String(province.id)}
//                           >
//                             {province.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.provinceId && (
//                   <p className="text-sm text-red-600 mt-1">
//                     {errors.provinceId.message}
//                   </p>
//                 )}
//               </div>

//               {/* Ciudad */}
//               <div>
//                 <Controller
//                   name="cityId"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       value={field.value ? String(field.value) : ""}
//                       onValueChange={(value) =>
//                         field.onChange(value ? Number(value) : undefined)
//                       }
//                       disabled={!selectedProvinceId}
//                     >
//                       <SelectTrigger>
//                         <SelectValue
//                           placeholder={
//                             selectedProvinceId
//                               ? "Seleccionar ciudad"
//                               : "Seleccione una provincia primero"
//                           }
//                         />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {filteredCities.map((city) => (
//                           <SelectItem key={city.id} value={String(city.id)}>
//                             {city.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.cityId && (
//                   <p className="text-sm text-red-600 mt-1">
//                     {errors.cityId.message}
//                   </p>
//                 )}
//               </div>

//               {/* Motivo */}
//               <div>
//                 <Controller
//                   name="statusReason"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       value={field.value ?? ""}
//                       onValueChange={(value) =>
//                         field.onChange(value || undefined)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Motivo" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="DEBT">Deuda</SelectItem>
//                         <SelectItem value="MISSING_DOCUMENTATION">
//                           Falta documentación
//                         </SelectItem>
//                         <SelectItem value="VOLUNTARY_LEAVE">
//                           Baja voluntaria
//                         </SelectItem>
//                         <SelectItem value="ADMIN_DECISION">
//                           Decisión administrativa
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.statusReason && (
//                   <p className="text-sm text-red-600 mt-1">
//                     {errors.statusReason.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <Separator />

//             <div className="flex justify-end gap-3">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onReset}
//                 disabled={loading}
//               >
//                 Limpiar filtros
//               </Button>

//               <Button type="submit" disabled={loading}>
//                 Generar
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </FormProvider>
//   );
// }

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
import { SlidersHorizontal } from "lucide-react";

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

  const { organizations } = useOrganizations();

  const selectedProvinceId = watch("provinceId");

  const filteredCities = selectedProvinceId
    ? cities.filter((city) => city.provinceId === selectedProvinceId)
    : [];

  return (
    <FormProvider {...form}>
      <Card className="shadow-xl">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-center gap-2 text-lg font-bold border-b pb-6">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Filtros de búsqueda
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {/* DNI */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">DNI</Label>
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
              <Label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Organización</Label>
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
              <Label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Estado</Label>
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
              <Label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Provincia</Label>
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
              <Label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Ciudad</Label>
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
              <Label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Motivo</Label>
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
