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
import { usePermissions } from "@/hooks/usePermissions";

// export function AffiliatesTable() {
//   const permissions = usePermissions();
//   const canEditUser = permissions.canEditUsers;

//   const [viewAffiliateId, setViewAffiliateId] = useState<string | null>(null);
//   const [editAffiliateId, setEditAffiliateId] = useState<string | null>(null);

//   const {
//     form,
//     data,
//     loading,
//     hasSearched,
//     submitSearch,
//     resetFilters,
//     updateAffiliateInTable,
//   } = useAffiliateSearch();

//   const { provinces, cities, loading: locationsLoading } = useLocations();

//   const handleView = (id: string) => setViewAffiliateId(id);
//   const handleEdit = (id: string) => {
//     if (!canEditUser) return;
//     setEditAffiliateId(id);
//   };

//   const closeViewModal = () => setViewAffiliateId(null);
//   const closeEditModal = () => setEditAffiliateId(null);

//   const tableColumns = buildColumns({
//     onView: handleView,
//     // onEdit: handleEdit,
//     onEdit: canEditUser ? handleEdit : undefined,
//   });

//   return (
//     <div className="space-y-6">
//       <AffiliatesFilters
//         form={form}
//         loading={loading || locationsLoading}
//         onSubmit={submitSearch}
//         onReset={resetFilters}
//         provinces={provinces}
//         cities={cities}
//       />

//       {loading && <AffiliatesTableSkeleton />}

//       {!loading && hasSearched && (
//         <DataTable
//           columns={tableColumns}
//           data={data}
//           filterColumn="dni"
//           filterPlaceholder="Filtrar por DNI..."
//         />
//       )}

//       {viewAffiliateId && (
//         <ViewAffiliateModal
//           affiliateId={viewAffiliateId}
//           onClose={closeViewModal}
//         />
//       )}

//       {canEditUser && editAffiliateId && (
//         <EditAffiliateModal
//           affiliateId={editAffiliateId}
//           onClose={closeEditModal}
//           onUpdated={updateAffiliateInTable}
//         />
//       )}
//     </div>
//   );
// }

export function AffiliatesTable() {
  const permissions = usePermissions();
  const canEditUser = permissions.canEditUsers;

  const [viewAffiliateId, setViewAffiliateId] = useState<string | null>(null);
  const [editAffiliateId, setEditAffiliateId] = useState<string | null>(null);

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

  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Afiliados</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-24">
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

        {/* FILTROS */}
        <aside className="h-fit sticky top-4">
          <AffiliatesFilters
            form={form}
            loading={loading || locationsLoading}
            onSubmit={submitSearch}
            onReset={resetFilters}
            provinces={provinces}
            cities={cities}
          />
        </aside>

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
      </div>
    </>
  );
}
