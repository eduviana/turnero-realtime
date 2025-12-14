"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns as buildColumns } from "../columns";
import { useAffiliateSearch } from "../hooks/useAffiliateSearch";
import { useLocations } from "../hooks/useLocations";
import { AffiliatesTableSkeleton } from "./AffiliatesTableSkeleton";
import { AffiliatesFilters } from "./AffiliatesFilters";

export function AffiliatesTable() {
  const {
    form,
    data,
    loading,
    hasSearched,
    submitSearch,
    resetFilters,
  } = useAffiliateSearch();

  const {
    provinces,
    cities,
    loading: locationsLoading,
  } = useLocations();

  const tableColumns = buildColumns();

  return (
    <div className="space-y-6">
      {/* FILTROS */}
      <AffiliatesFilters
        form={form}
        loading={loading || locationsLoading}
        onSubmit={submitSearch}
        onReset={resetFilters}
        provinces={provinces}
        cities={cities}
      />

      {/* RESULTADOS */}
      {loading && <AffiliatesTableSkeleton />}

      {!loading && hasSearched && (
        <DataTable
          columns={tableColumns}
          data={data}
          filterColumn="dni"
          filterPlaceholder="Filtrar por DNI..."
        />
      )}
    </div>
  );
}