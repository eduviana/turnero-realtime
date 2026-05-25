"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserViewSkeleton } from "./UserViewSkeleton";
import { useEditUser } from "../hooks/useEditUser";
import { useState } from "react";
import { UserServicesUpdateResult } from "@/features/service/types/service";

interface EditUserModalProps {
  userId: string;
  onClose: () => void;
  onUpdated: (data: UserServicesUpdateResult) => void;
}

const CARD_HEIGHT_CLASS = "h-[24rem]";

export function EditUserModal(props: EditUserModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | undefined
  >(undefined);
  const {
    user,
    services,
    availableServices,
    loading,
    saving,
    error,
    toggleService,
    addService,
    handleSave,
  } = useEditUser(props);

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent
        showCloseButton={false}
        className="
        max-w-lg
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
        {/* HEADER */}
        <div className="relative flex items-center justify-between bg-foreground px-6 py-6">
          <DialogTitle className="m-0 text-xl font-semibold leading-none text-white">
            Editar usuario
          </DialogTitle>

          <DialogClose className="cursor-pointer text-white opacity-100 transition-opacity hover:opacity-70">
            <X className="size-5" />
          </DialogClose>
        </div>

        {/* BODY */}
        <div className="bg-white">
          {/* LOADING */}
          {loading && (
            <div className="p-6">
              <UserViewSkeleton className={CARD_HEIGHT_CLASS} />
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="p-6 text-center font-medium text-red-500">
              {error}
            </div>
          )}

          {/* CONTENT */}
          {!loading && !error && user && (
            <div className="flex flex-col gap-2 px-4 py-4 pb-8 bg-gradient-to-b from-slate-200 via-slate-10 to-white">
              {/* SECCIÓN 1 — Perfil */}
              <section className="flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white/40 px-6 py-8 text-center backdrop-blur-[1px]">
                <div className="mb-4 rounded-full">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Foto de perfil"
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-slate-400">Sin foto</span>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold leading-tight text-slate-900">
                  {user.firstName} {user.lastName}
                </h3>

                {user.email && (
                  <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                )}

                <Badge className="mt-4 rounded bg-sidebar px-4 py-1.5 text-sm uppercase tracking-widest text-white">
                  {user.role}
                </Badge>
              </section>

              {/* SECCIÓN 2 — Servicios vinculados */}
              <section className="rounded-2xl border border-slate-200/70 bg-white/35 px-6 py-6 backdrop-blur-[1px]">
                <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Servicios vinculados
                </Label>

                {services.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Este usuario no tiene servicios asignados.
                  </p>
                )}

                <div className="space-y-2">
                  {services.map((service) => (
                    <div
                      key={service.serviceId}
                      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200/70 bg-white/60 px-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Checkbox
                          checked={service.assigned}
                          onCheckedChange={() =>
                            toggleService(service.serviceId)
                          }
                        />
                        <span className="truncate text-sm font-medium text-slate-700">
                          {service.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vincular servicio */}
                {availableServices.length > 0 && (
                  <div className="mt-4 border-t border-slate-200/70 pt-4 space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Vincular servicio
                    </Label>

                    <div className="flex gap-2">
                      <Select
                        value={selectedServiceId}
                        onValueChange={setSelectedServiceId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar servicio" />
                        </SelectTrigger>

                        <SelectContent>
                          {availableServices.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={() => {
                          const service = availableServices.find(
                            (s) => s.id === selectedServiceId,
                          );
                          if (service) addService(service);
                        }}
                        disabled={!selectedServiceId}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                )}

                {availableServices.length === 0 && services.length > 0 && (
                  <p className="mt-3 text-xs text-slate-400">
                    No hay más servicios disponibles para vincular.
                  </p>
                )}
              </section>

              {/* SECCIÓN 3 — Acciones */}
              <section className="rounded-2xl border border-slate-200/70 bg-white/30 px-6 py-5 backdrop-blur-[1px]">
                <DialogFooter className="flex justify-end gap-2 sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={props.onClose}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>

                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </DialogFooter>
              </section>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
