"use client";

import { Package, PlusCircle } from "lucide-react";
import { PharmacyGeneralSearchResult } from "../hooks/usePharmacyGeneralSearch";
// import { PharmacyGeneralSearchResult } from "../hooks/usePharmacyGeneralSearch";


interface Props {
  results: PharmacyGeneralSearchResult[];
  onSelect: (product: PharmacyGeneralSearchResult) => void;
  isSearching: boolean;
  hasSearched: boolean;
  activeIndex: number;
  disabled?: boolean;
  query: string;
}

export function SearchResults({
  results,
  onSelect,
  isSearching,
  hasSearched,
  activeIndex,
  disabled = false,
  query,
}: Props) {
  const hasQuery = query.trim().length >= 2;

  if (!hasQuery) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      {isSearching && (
        <div className="space-y-3 p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
              <div className="h-7 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      )}

      {!isSearching && hasSearched && results.length === 0 && (
        <div className="px-4 py-3 text-sm text-slate-500">
          No se encontraron resultados
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <ul className="max-h-72 overflow-y-auto">
          {results.map((product, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={product.id}
                className={`group flex cursor-pointer items-center justify-between px-4 py-3 transition-colors ${
                  disabled
                    ? "opacity-50"
                    : isActive
                    ? "bg-slate-100"
                    : "hover:bg-slate-50"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (disabled) return;
                  onSelect(product);
                }}
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-slate-400" />

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Producto de farmacia general
                    </p>
                  </div>
                </div>

                <PlusCircle
                  className={`h-5 w-5 transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-slate-300 group-hover:text-primary"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}