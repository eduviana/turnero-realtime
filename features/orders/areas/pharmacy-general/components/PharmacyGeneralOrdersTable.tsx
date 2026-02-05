"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { PharmacyGeneralOrderRow } from "../types/pharmacy-general";
import { pharmacyGeneralOrdersColumns } from "../columns";
import { PharmacyGeneralOrderDetailModal } from "./PharmacyGeneralOrderDetailModal";

interface Props {
  data: PharmacyGeneralOrderRow[];
}

export default function PharmacyGeneralOrdersTable({ data }: Props) {
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
  const columns = pharmacyGeneralOrdersColumns({
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
        <PharmacyGeneralOrderDetailModal
          orderId={viewOrderId}
          open={true}
          onClose={closeModal}
        />
       
      )}
    </>
  );
}


