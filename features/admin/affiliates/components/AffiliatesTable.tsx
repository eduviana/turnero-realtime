"use client";

import { useState } from "react";
import {
  AffiliateStatus,
  AffiliateStatusReason,
} from "@/generated/prisma/enums";
import { DataTable } from "@/components/ui/data-table";
import { columns as buildColumns } from "../columns";
import { AffiliateTableRow, FiltersState } from "../types/affiliate";

const INITIAL_FILTERS: FiltersState = {
  dni: "",
  organization: "",
  province: "",
  city: "",
  limit: 20,
};

export function AffiliatesTable() {
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);
  const [data, setData] = useState<AffiliateTableRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  function update<K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSearch() {
    try {
      setLoading(true);
      setHasSearched(true);

      const payload = {
        ...filters,
        createdFrom: filters.createdFrom
          ? new Date(filters.createdFrom)
          : undefined,
        createdTo: filters.createdTo
          ? new Date(filters.createdTo)
          : undefined,
      };

      const res = await fetch("/api/affiliate/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Error al buscar afiliados");
      }

      const { data } = await res.json();
      setData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Affiliate search failed:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function handleClearFilters() {
    setFilters(INITIAL_FILTERS);
    setData(null);
    setHasSearched(false);
  }

  const tableColumns = buildColumns();

  return (
    <div className="space-y-6">
      {/* FILTROS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="DNI"
          value={filters.dni}
          onChange={(e) => update("dni", e.target.value)}
          className="border rounded px-3 py-2"
        />

        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            update(
              "status",
              e.target.value
                ? (e.target.value as AffiliateStatus)
                : undefined
            )
          }
          className="border rounded px-3 py-2"
        >
          <option value="">Estado</option>
          <option value="ACTIVE">Activo</option>
          <option value="SUSPENDED">Suspendido</option>
          <option value="INACTIVE">Inactivo</option>
        </select>

        <select
          value={filters.statusReason ?? ""}
          onChange={(e) =>
            update(
              "statusReason",
              e.target.value
                ? (e.target.value as AffiliateStatusReason)
                : undefined
            )
          }
          className="border rounded px-3 py-2"
        >
          <option value="">Motivo</option>
          <option value="DEBT">Deuda</option>
          <option value="MISSING_DOCUMENTATION">
            Falta documentación
          </option>
          <option value="VOLUNTARY_LEAVE">Baja voluntaria</option>
          <option value="ADMIN_DECISION">Decisión administrativa</option>
        </select>

        <input
          placeholder="Organización"
          value={filters.organization}
          onChange={(e) => update("organization", e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          placeholder="Provincia"
          value={filters.province}
          onChange={(e) => update("province", e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          placeholder="Ciudad"
          value={filters.city}
          onChange={(e) => update("city", e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          value={filters.createdFrom ?? ""}
          onChange={(e) => update("createdFrom", e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          value={filters.createdTo ?? ""}
          onChange={(e) => update("createdTo", e.target.value)}
          className="border rounded px-3 py-2"
        />

        <select
          value={filters.limit}
          onChange={(e) => update("limit", Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          <option value={10}>Últimos 10</option>
          <option value={20}>Últimos 20</option>
          <option value={30}>Últimos 30</option>
          <option value={50}>Últimos 50</option>
        </select>
      </div>

      {/* ACCIONES */}
      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Generar"}
        </button>

        {hasSearched && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-6 py-2 rounded border"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* RESULTADOS */}
      {hasSearched && (
        <>
          {loading && (
            <div className="text-sm text-muted-foreground">
              Buscando afiliados...
            </div>
          )}

          {!loading && data?.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No se encontraron afiliados con los filtros seleccionados.
            </div>
          )}

          {!loading && data && data.length > 0 && (
            <DataTable
              columns={tableColumns}
              data={data}
              filterColumn="dni"
              filterPlaceholder="Filtrar por DNI..."
            />
          )}
        </>
      )}
    </div>
  );
}