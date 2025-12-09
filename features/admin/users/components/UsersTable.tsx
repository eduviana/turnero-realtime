"use client";

import { useState } from "react";
import { columns as buildColumns } from "../columns";
import { DataTable } from "../data-table";

import { UserTableRow } from "../types/users";
import { ViewUserModal } from "./ViewUserModal";

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
    // Se elimina onEdit por completo
  });

  return (
    <>
      <DataTable columns={tableColumns} data={data} />

      {selectedUserId && (
        <ViewUserModal
          userId={selectedUserId}
          onClose={closeModal}
        />
      )}
    </>
  );
}