"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns as buildColumns } from "../columns";
import { useAffiliateSearch } from "../hooks/useAffiliateSearch";
import { useLocations } from "../hooks/useLocations";
import { AffiliatesTableSkeleton } from "./AffiliatesTableSkeleton";
import { AffiliatesFilters } from "./AffiliatesFilters";
import { ViewAffiliateModal } from "./ViewAffiliateModal";
import { EditAffiliateModal } from "./EditAffiliateModal";

export function AffiliatesTable() {
  const [viewAffiliateId, setViewAffiliateId] = useState<string | null>(null);
  const [editAffiliateId, setEditAffiliateId] = useState<string | null>(null);

  const { form, data, loading, hasSearched, submitSearch, resetFilters, updateAffiliateInTable } =
    useAffiliateSearch();

  const { provinces, cities, loading: locationsLoading } = useLocations();

  const handleView = (id: string) => setViewAffiliateId(id);
  const handleEdit = (id: string) => setEditAffiliateId(id);

  const closeViewModal = () => setViewAffiliateId(null);
  const closeEditModal = () => setEditAffiliateId(null);

  const tableColumns = buildColumns({
    onView: handleView,
    onEdit: handleEdit,
  });

  return (
    <div className="space-y-6">
      <AffiliatesFilters
        form={form}
        loading={loading || locationsLoading}
        onSubmit={submitSearch}
        onReset={resetFilters}
        provinces={provinces}
        cities={cities}
      />

      {loading && <AffiliatesTableSkeleton />}

      {!loading && hasSearched && (
        <DataTable
          columns={tableColumns}
          data={data}
          filterColumn="dni"
          filterPlaceholder="Filtrar por DNI..."
        />
      )}

      {viewAffiliateId && (
        <ViewAffiliateModal
          affiliateId={viewAffiliateId}
          onClose={closeViewModal}
        />
      )}

      {editAffiliateId && (
        <EditAffiliateModal
          affiliateId={editAffiliateId}
          onClose={closeEditModal}
          onUpdated={updateAffiliateInTable}
        />
      )}
    </div>
  );
}