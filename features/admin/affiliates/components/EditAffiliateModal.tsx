// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   AffiliateDataViewModal,
//   AffiliateEditFormData,
//   AffiliateTableRow,
// } from "../types/affiliate";
// import { getAffiliateById } from "../services/getAffiliateById";
// import { useLocations } from "../hooks/useLocations";
// import { updateAffiliate } from "../services/updateAffiliate";
// import { AffiliateEditSkeleton } from "./AffiliateEditSkeleton";

// interface EditAffiliateModalProps {
//   affiliateId: string;
//   onClose: () => void;
//   onUpdated: (affiliate: AffiliateTableRow) => void;
// }

// export function EditAffiliateModal({
//   affiliateId,
//   onClose,
//   onUpdated,
// }: EditAffiliateModalProps) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   const { provinces, cities, loading: locationsLoading } = useLocations();

//   const form = useForm<AffiliateEditFormData>();

//   const selectedProvinceId = form.watch("provinceId");

//   const filteredCities = cities.filter(
//     (city) => city.provinceId === selectedProvinceId
//   );

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);

//         const affiliate: AffiliateDataViewModal = await getAffiliateById(
//           affiliateId
//         );

//         form.reset({
//           dni: affiliate.dni,
//           firstName: affiliate.firstName,
//           lastName: affiliate.lastName,
//           phone: affiliate.phone,
//           email: affiliate.email,
//           provinceId: affiliate.provinceId,
//           cityId: affiliate.cityId,
//           status: affiliate.status,
//           statusReason: affiliate.statusReason,
//         });
//       } catch (err: any) {
//         setError(err.message ?? "Error al cargar afiliado");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [affiliateId, form]);

//   const onSubmit = async (values: AffiliateEditFormData) => {
//     try {
//       setSubmitting(true);
//       setError(null);

//       const updatedAffiliate = await updateAffiliate(affiliateId, values);

//       onUpdated(updatedAffiliate); // 🔑 esto dispara el re-render
//       onClose();
//     } catch (err: any) {
//       setError(err.message ?? "Error al guardar cambios");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading || locationsLoading) {
//     return <AffiliateEditSkeleton />;
//   }

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl w-full">
//         <DialogHeader>
//           <DialogTitle>Editar afiliado</DialogTitle>
//         </DialogHeader>

//         {error && (
//           <div className="py-4 text-center text-red-500 font-medium">
//             {error}
//           </div>
//         )}

//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* DATOS PERSONALES */}
//           <Card>
//             <CardHeader className="pb-2">
//               <h4 className="text-sm font-semibold uppercase text-muted-foreground">
//                 Datos personales
//               </h4>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-4">
//                 <Label>DNI</Label>
//                 <Input {...form.register("dni", { required: true })} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <Label>Nombre</Label>
//                 <Input {...form.register("firstName", { required: true })} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <Label>Apellido</Label>
//                 <Input {...form.register("lastName", { required: true })} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <Label>Teléfono</Label>
//                 <Input {...form.register("phone")} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <Label>Email</Label>
//                 <Input type="email" {...form.register("email")} />
//               </div>
//             </CardContent>
//           </Card>

//           {/* UBICACIÓN */}
//           <Card>
//             <CardHeader className="pb-2">
//               <h4 className="text-sm font-semibold uppercase text-muted-foreground">
//                 Ubicación
//               </h4>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-4">
//                 <Label>Provincia</Label>
//                 <Select
//                   value={String(form.watch("provinceId"))}
//                   onValueChange={(v) => {
//                     form.setValue("provinceId", Number(v));
//                     form.setValue("cityId", undefined as any);
//                   }}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Seleccionar provincia" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {provinces.map((p) => (
//                       <SelectItem key={p.id} value={String(p.id)}>
//                         {p.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex flex-col gap-4">
//                 <Label>Ciudad</Label>
//                 <Select
//                   value={String(form.watch("cityId"))}
//                   onValueChange={(v) => form.setValue("cityId", Number(v))}
//                   disabled={!selectedProvinceId}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Seleccionar ciudad" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {filteredCities.map((c) => (
//                       <SelectItem key={c.id} value={String(c.id)}>
//                         {c.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           {/* ESTADO */}
//           <Card>
//             <CardHeader className="pb-2">
//               <h4 className="text-sm font-semibold uppercase text-muted-foreground">
//                 Estado administrativo
//               </h4>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//               <div className="flex flex-col gap-4">
//                 <Label>Estado</Label>
//                 <Select
//                   value={form.watch("status")}
//                   onValueChange={(v) => form.setValue("status", v as any)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="ACTIVE">Activo</SelectItem>
//                     <SelectItem value="SUSPENDED">Suspendido</SelectItem>
//                     <SelectItem value="INACTIVE">Inactivo</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex flex-col gap-4">
//                 <Label>Motivo</Label>
//                 <Select
//                   value={form.watch("statusReason")}
//                   onValueChange={(v) => form.setValue("statusReason", v as any)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="NONE">Ninguno</SelectItem>
//                     <SelectItem value="DEBT">Deuda</SelectItem>
//                     <SelectItem value="MISSING_DOCUMENTATION">
//                       Falta documentación
//                     </SelectItem>
//                     <SelectItem value="VOLUNTARY_LEAVE">
//                       Baja voluntaria
//                     </SelectItem>
//                     <SelectItem value="ADMIN_DECISION">
//                       Decisión administrativa
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           {/* ACTIONS */}
//           <div className="flex justify-end gap-3">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               disabled={submitting}
//             >
//               Cancelar
//             </Button>

//             <Button type="submit" disabled={submitting}>
//               Guardar cambios
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    (city) => city.provinceId === selectedProvinceId
  );

  useEffect(() => {
    const loadAffiliate = async () => {
      try {
        setLoading(true);
        setError(null);

        const affiliate: AffiliateDataViewModal =
          await getAffiliateById(affiliateId);

        setCreatedAt(
          new Date(affiliate.createdAt).toLocaleDateString("es-AR")
        );

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
        values as AffiliateEditFormData
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
      <DialogContent className="w-full max-w-5xl p-6">
        <DialogHeader>
          <DialogTitle>Editar afiliado</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-center text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <form
          id="edit-affiliate-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* DATOS PERSONALES */}
          <Card>
            <CardHeader className="pb-3">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                Datos personales
              </h4>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <Label>Nombre</Label>
                <Input {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <Label>Apellido</Label>
                <Input {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <Label>Teléfono</Label>
                <Input {...register("phone")} />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* DNI */}
              <div className="md:col-span-2">
                <Label>DNI</Label>
                <Input {...register("dni")} />
                {errors.dni && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.dni.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* UBICACIÓN */}
          <Card>
            <CardHeader className="pb-3">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                Ubicación
              </h4>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Provincia */}
              <div>
                <Label>Provincia</Label>
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
                      <SelectTrigger>
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
                  <p className="text-xs text-red-600 mt-1">
                    {errors.provinceId.message}
                  </p>
                )}
              </div>

              {/* Ciudad */}
              <div>
                <Label>Ciudad</Label>
                <Controller
                  name="cityId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(v) => field.onChange(Number(v))}
                      disabled={!selectedProvinceId}
                    >
                      <SelectTrigger>
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
                  <p className="text-xs text-red-600 mt-1">
                    {errors.cityId.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ESTADO */}
          <Card>
            <CardHeader className="pb-3">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                Estado administrativo
              </h4>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estado */}
              <div>
                <Label>Estado</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
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
                {errors.status && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Motivo */}
              <div>
                <Label>Motivo</Label>
                <Controller
                  name="statusReason"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
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
                {errors.statusReason && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.statusReason.message}
                  </p>
                )}
              </div>

              {/* Fecha creación */}
              <div className="md:col-span-2">
                <Label>Fecha de creación</Label>
                <Input value={createdAt} disabled className="bg-muted" />
              </div>
            </CardContent>
          </Card>
        </form>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
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
            Guardar cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}