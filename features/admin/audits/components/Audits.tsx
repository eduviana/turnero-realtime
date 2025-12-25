


"use client";


import { DataTable } from "@/components/ui/data-table";
import { columns as buildColumns } from "../columns";

interface AuditsProps {
  data: any[];
}

export function Audits({ data }: AuditsProps) {
  const columns = buildColumns({});

  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}