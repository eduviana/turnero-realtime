"use client";

import { useState } from "react";
import { columns as buildColumns } from "../columns";
import { UserTableRow } from "../types/users";
import { ViewUserModal } from "./ViewUserModal";
import { DataTable } from "@/components/ui/data-table";

interface UsersTableProps {
  data: UserTableRow[];
}

export default function UsersTable({ data }: UsersTableProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleView = (id: string) => {
    setSelectedUserId(id);
  };

  const closeModal = () => {
    setSelectedUserId(null);
  };

  const tableColumns = buildColumns({
    onView: handleView,
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={data}
        filterColumn="user"
        filterPlaceholder="Filtrar por email..."
      />

      {selectedUserId && (
        <ViewUserModal userId={selectedUserId} onClose={closeModal} />
      )}
    </>
  );
}
