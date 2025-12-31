"use client";

import { useState } from "react";
import { ServiceTableRow } from "../types/service";
import { columns as buildColumns } from "../columns";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmToggleDialog } from "./ConfirmToggleDialog";
import { usePermissions } from "@/hooks/usePermissions";

interface ServicesTableProps {
  data: ServiceTableRow[];
}

export default function ServicesTable({ data }: ServicesTableProps) {
  const permissions = usePermissions();
  const canToggleServices = permissions.canToggleServices;

  const [services, setServices] = useState<ServiceTableRow[]>(data);

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pendingValue, setPendingValue] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const servicePending = services.find((s) => s.id === pendingId);

  const requestToggleService = (id: string, newValue: boolean) => {
    if (!canToggleServices) return; // seguridad UI

    setPendingId(id);
    setPendingValue(newValue);
    setDialogOpen(true);
  };

  const confirmToggle = async () => {
    if (!pendingId) return;

    try {
      setServices((prev) =>
        prev.map((s) =>
          s.id === pendingId ? { ...s, isActive: pendingValue } : s
        )
      );

      const response = await fetch(`/api/services/${pendingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: pendingValue }),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar el servicio");
      }
    } catch (error) {
      // revertir cambio optimista
      setServices((prev) =>
        prev.map((s) =>
          s.id === pendingId ? { ...s, isActive: !pendingValue } : s
        )
      );
      console.error(error);
    } finally {
      setDialogOpen(false);
      setPendingId(null);
    }
  };

  const cancelToggle = () => {
    setDialogOpen(false);
    setPendingId(null);
  };

  const tableColumns = buildColumns({
    onToggleActive: canToggleServices ? requestToggleService : undefined,
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={services}
        filterColumn="name"
        filterPlaceholder="Filtrar por nombre..."
      />

      {canToggleServices && (
        <ConfirmToggleDialog
          open={dialogOpen}
          serviceName={servicePending?.name}
          newValue={pendingValue}
          onConfirm={confirmToggle}
          onCancel={cancelToggle}
        />
      )}
    </>
  );
}