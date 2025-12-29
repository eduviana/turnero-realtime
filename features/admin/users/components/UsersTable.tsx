"use client";
import { useState } from "react";
import { columns as buildColumns } from "../columns";
import { UserTableRow } from "../types/users";
import { ViewUserModal } from "./ViewUserModal";
import { EditUserModal } from "./EditUserModal";
import { DataTable } from "@/components/ui/data-table";
import { UserServicesUpdateResult } from "@/features/service/types/service";

interface UsersTableProps {
  data: UserTableRow[];
}

export default function UsersTable({ data }: UsersTableProps) {
  const [rows, setRows] = useState<UserTableRow[]>(data);
  const [viewUserId, setViewUserId] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);

  // ───────────────────────────────
  // Handlers
  // ───────────────────────────────
  const handleView = (id: string) => {
    setViewUserId(id);
  };

  const handleEdit = (id: string) => {
    setEditUserId(id);
  };

  const closeViewModal = () => {
    setViewUserId(null);
  };

  const closeEditModal = () => {
    setEditUserId(null);
  };

  const handleUserUpdated = (result: UserServicesUpdateResult) => {
  setRows((prev) =>
    prev.map((row) =>
      row.id === result.userId
        ? { ...row, serviceCodes: result.serviceCodes }
        : row
    )
  );

  setEditUserId(null);
};

  // ───────────────────────────────
  // Columnas
  // ───────────────────────────────
  const tableColumns = buildColumns({
    onView: handleView,
    onEdit: handleEdit,
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={rows}
        filterColumn="user"
        filterPlaceholder="Filtrar por email..."
      />

      {viewUserId && (
        <ViewUserModal userId={viewUserId} onClose={closeViewModal} />
      )}

      {editUserId && (
        <EditUserModal
          userId={editUserId}
          onClose={closeEditModal}
          onUpdated={handleUserUpdated}
        />
      )}
    </>
  );
}
