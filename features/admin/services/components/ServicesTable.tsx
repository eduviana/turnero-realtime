// "use client";

// import { useState } from "react";
// import { ServiceTableRow } from "../types/service";
// import { columns as buildColumns } from "../columns";
// import { DataTable } from "@/components/ui/data-table";

// interface ServicesTableProps {
//   data: ServiceTableRow[];
// }

// export default function ServicesTable({ data }: ServicesTableProps) {
//   const [services, setServices] = useState<ServiceTableRow[]>(data);

//   const handleToggleActive = async (id: string, newValue: boolean) => {
//     try {
//       // 1. Optimistic UI update
//       setServices(prev =>
//         prev.map(s =>
//           s.id === id ? { ...s, isActive: newValue } : s
//         )
//       );

//       // 2. Send PATCH to backend
//       const response = await fetch(`/api/services/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isActive: newValue }),
//       });

//       if (!response.ok) {
//         throw new Error("No se pudo actualizar el servicio");
//       }

//       console.log("Servicio actualizado correctamente");
//     } catch (error) {
//       console.error("Error al actualizar el estado del servicio:", error);

//       // 3. Revert UI if request fails
//       setServices(prev =>
//         prev.map(s =>
//           s.id === id ? { ...s, isActive: !newValue } : s
//         )
//       );
//     }
//   };

//   const tableColumns = buildColumns({
//     onToggleActive: handleToggleActive,
//   });

//   return (
//     <DataTable
//       columns={tableColumns}
//       data={services}
//       filterColumn="name"
//       filterPlaceholder="Filtrar por nombre..."
//     />
//   );
// }

"use client";

import { useState } from "react";
import { ServiceTableRow } from "../types/service";
import { columns as buildColumns } from "../columns";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmToggleDialog } from "./ConfirmToggleDialog";

interface ServicesTableProps {
  data: ServiceTableRow[];
}

export default function ServicesTable({ data }: ServicesTableProps) {
  const [services, setServices] = useState<ServiceTableRow[]>(data);

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pendingValue, setPendingValue] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const servicePending = services.find(s => s.id === pendingId);

  const requestToggleService = (id: string, newValue: boolean) => {
    setPendingId(id);
    setPendingValue(newValue);
    setDialogOpen(true);
  };

  const confirmToggle = async () => {
    if (!pendingId) return;

    try {
      setServices(prev =>
        prev.map(s =>
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
      // revert if failed
      setServices(prev =>
        prev.map(s =>
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
    onToggleActive: requestToggleService,
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={services}
        filterColumn="name"
        filterPlaceholder="Filtrar por nombre..."
      />

      <ConfirmToggleDialog
        open={dialogOpen}
        serviceName={servicePending?.name}
        newValue={pendingValue}
        onConfirm={confirmToggle}
        onCancel={cancelToggle}
      />
    </>
  );
}