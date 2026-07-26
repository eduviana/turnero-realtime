"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DataTable } from "@/components/ui/data-table";
import { columns as buildColumns } from "../columns";
import { useAffiliateSearch } from "../hooks/useAffiliateSearch";
import { useLocations } from "../hooks/useLocations";
import { AffiliatesTableSkeleton } from "./AffiliatesTableSkeleton";
import { AffiliatesFilters } from "./AffiliatesFilters";
import { ViewAffiliateModal } from "./ViewAffiliateModal";
import { EditAffiliateModal } from "./EditAffiliateModal";
import { usePermissions } from "@/hooks/usePermissions";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export function AffiliatesTable() {
  const permissions = usePermissions();
  const canEditUser = permissions.canEditUsers;

  const [viewAffiliateId, setViewAffiliateId] = useState<string | null>(null);
  const [editAffiliateId, setEditAffiliateId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const {
    form,
    data,
    loading,
    hasSearched,
    submitSearch,
    resetFilters,
    updateAffiliateInTable,
  } = useAffiliateSearch();

  const { provinces, cities, loading: locationsLoading } = useLocations();

  const tableColumns = buildColumns({
    onView: setViewAffiliateId,
    onEdit: canEditUser ? setEditAffiliateId : undefined,
  });

  const handleSearchAndClose = () => {
    submitSearch();
    setShowFilters(false);
  };

  const filtersContent = (
    <AffiliatesFilters
      form={form}
      loading={loading || locationsLoading}
      onSubmit={handleSearchAndClose}
      onReset={resetFilters}
      provinces={provinces}
      cities={cities}
      onClose={undefined}
    />
  );

  const filtersContentWithClose = (close: () => void) => (
    <AffiliatesFilters
      form={form}
      loading={loading || locationsLoading}
      onSubmit={() => { submitSearch(); close(); }}
      onReset={resetFilters}
      provinces={provinces}
      cities={cities}
      onClose={close}
    />
  );

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Afiliados</h1>

        <Button
          variant="outline"
          className="2xl:hidden flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm w-[116px]"
          onClick={() => setShowFilters(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_320px] gap-8">
        {/* TABLA */}
        <div className="min-h-[400px] flex flex-col">
          {loading && <AffiliatesTableSkeleton />}

          {!loading && !hasSearched && (
            <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-white">
              <div className="text-center max-w-sm space-y-2">
                <p className="text-sm font-medium text-slate-700">
                  No hay resultados para mostrar
                </p>
                <p className="text-sm text-slate-500">
                  Utilice los filtros para realizar una búsqueda de afiliados.
                </p>
              </div>
            </div>
          )}

          {!loading && hasSearched && data.length === 0 && (
            <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-white">
              <div className="text-center max-w-sm space-y-2">
                <p className="text-sm font-medium text-slate-700">
                  No se encontraron afiliados
                </p>
                <p className="text-sm text-slate-500">
                  Intente modificar los filtros de búsqueda.
                </p>
              </div>
            </div>
          )}

          {!loading && hasSearched && data.length > 0 && (
            <DataTable
              columns={tableColumns}
              data={data}
              filterColumn="dni"
              filterPlaceholder="Filtrar por DNI..."
            />
          )}
        </div>

        {/* FILTROS — SIDEBAR (desktop) */}
        <aside className="hidden 2xl:block h-fit sticky top-4">
          {filtersContent}
        </aside>
      </div>

      {/* FILTROS — DRAWER (mobile) — portal to body */}
      {mounted && createPortal(
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 2xl:hidden ${
              showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setShowFilters(false)}
          />

          {/* Panel */}
          <div
            className={`fixed right-0 top-0 h-screen w-80 z-50 transition-transform duration-300 ease-in-out 2xl:hidden ${
              showFilters ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {filtersContentWithClose(() => setShowFilters(false))}
          </div>
        </>,
        document.body
      )}

      {/* MODALES */}
      {viewAffiliateId && (
        <ViewAffiliateModal
          affiliateId={viewAffiliateId}
          onClose={() => setViewAffiliateId(null)}
        />
      )}

      {canEditUser && editAffiliateId && (
        <EditAffiliateModal
          affiliateId={editAffiliateId}
          onClose={() => setEditAffiliateId(null)}
          onUpdated={updateAffiliateInTable}
        />
      )}
    </>
  );
}
