"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

import { PharmacyMedicationOrderRow } from "../types/pharmacy-medication";

import { pharmacyMedicationOrdersColumns } from "../columns";
import { PharmacyMedicationOrderDetailModal } from "./PharmacyMedicationOrderDetailModal";

interface Props {
  data: PharmacyMedicationOrderRow[];
}

export default function PharmacyMedicationOrdersTable({ data }: Props) {
  const [rows] = useState(data);
  const [viewOrderId, setViewOrderId] = useState<string | null>(null);

  // ───────────────────────────────
  // Handlers
  // ───────────────────────────────
  const handleView = (orderId: string) => {
    setViewOrderId(orderId);
  };

  const closeModal = () => {
    setViewOrderId(null);
  };

  // ───────────────────────────────
  // Columns
  // ───────────────────────────────
  const columns = pharmacyMedicationOrdersColumns({
    onView: handleView,
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={rows}
        filterColumn="affiliate"
        filterPlaceholder="Filtrar por afiliado o DNI..."
      />

      {viewOrderId && (
        <PharmacyMedicationOrderDetailModal
          orderId={viewOrderId}
          open={true}
          onClose={closeModal}
        />
      )}
    </>
  );
}
