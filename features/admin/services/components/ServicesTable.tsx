"use client";

import { useState } from "react";
import { ServiceTableRow } from "../types/service";
import { columns as buildColumns } from "../columns";
import { DataTable } from "@/components/ui/data-table";


interface ServicesTableProps {
  data: ServiceTableRow[];
}

export default function ServicesTable({ data }: ServicesTableProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const handleView = (id: string) => {
    setSelectedServiceId(id);
  };

  const closeModal = () => {
    setSelectedServiceId(null);
  };

  const tableColumns = buildColumns({
    onView: handleView,
  });

  return (
    <>
      <DataTable columns={tableColumns} data={data} filterColumn="name" filterPlaceholder="Filtrar por nombre..."/>

      {/* Cuando tengas el modal lo activás acá */}
      {/* {selectedServiceId && (
        <ViewServiceModal
          serviceId={selectedServiceId}
          onClose={closeModal}
        />
      )} */}
    </>
  );
}