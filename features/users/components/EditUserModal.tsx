"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  //   const handleAddService = () => {
  //   const service = availableServices.find(s => s.id === selectedServiceId);
  //   if (!service) return;

  //   addService(service);
  //   setSelectedServiceId(undefined);
  // };

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent className="w-full px-10 py-8 gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar usuario</DialogTitle>
        </DialogHeader>

        {/* LOADING */}
        {loading && <UserViewSkeleton className={CARD_HEIGHT_CLASS} />}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center py-6 text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && user && (
          <Card className="overflow-hidden w-full p-0 gap-0">
            {/* HEADER (idéntico al modal de solo lectura) */}
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

                  <Badge className="uppercase tracking-wide mt-2">
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {/* BODY */}
            <CardContent className="px-6 py-6 space-y-6 overflow-auto">
              {/* SERVICIOS ASIGNADOS */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">
                  Servicios vinculados
                </Label>

                {services.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Este usuario no tiene servicios asignados.
                  </p>
                )}

                {services.map((service) => (
                  <div
                    key={service.serviceId}
                    className="flex items-center justify-between gap-4 border rounded-md px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Checkbox
                        checked={service.assigned}
                        onCheckedChange={() => toggleService(service.serviceId)}
                      />

                      <span className="font-medium text-sm truncate">
                        {service.name}
                      </span>

                      {/* {service.isPrimary && (
                        <Badge variant="secondary" className="ml-2">
                          Primario
                        </Badge>
                      )} */}
                    </div>
                    {/* 
                    {service.assigned && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setPrimaryService(service.serviceId)
                        }
                        disabled={service.isPrimary}
                      >
                        Marcar primario
                      </Button>
                    )} */}
                  </div>
                ))}
              </div>

              {/* VINCULAR SERVICIO */}
              <div className="pt-4 border-t space-y-3">
                <Label className="text-lg font-medium">Vincular servicio</Label>

                {availableServices.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No hay servicios disponibles para vincular.
                  </p>
                ) : (
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
                          (s) => s.id === selectedServiceId
                        );
                        if (service) addService(service);
                      }}
                      disabled={!selectedServiceId}
                    >
                      Agregar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* FOOTER */}
        {!loading && !error && (
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={props.onClose} disabled={saving}>
              Cancelar
            </Button>

            <Button onClick={handleSave} disabled={saving}>
              Guardar cambios
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
